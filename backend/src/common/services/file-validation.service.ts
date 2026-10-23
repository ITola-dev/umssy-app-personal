import { Injectable } from '@nestjs/common';
import { FILE_SIGNATURES } from '../constants/file-signatures.constants.js';
import { CorruptedFileException } from '../exceptions/corrupted-file.exception.js';
import { EmptyFileException } from '../exceptions/empty-file.exception.js';
import { FileTooLargeException } from '../exceptions/file-too-large.exception.js';
import { InvalidFileTypeException } from '../exceptions/invalid-file-type.exception.js';
import type { FileSignature } from '../types/file-signature.type.js';
import type { FileValidationRules } from '../types/file-validation-rules.type.js';
import type { UploadedFile } from '../types/uploaded-file.type.js';
import type { ValidatedFile } from '../types/validated-file.type.js';

const MIN_REALISTIC_FILE_SIZE = 50;
const INTEGRITY_TAIL_BYTES = 1024;
const MAX_SAFE_TRAILING_BYTES = 64;

const PDF_HEADER = Buffer.from('%PDF-');
const PDF_EOF_MARKER = Buffer.from('%%EOF');

const PNG_FULL_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const PNG_IHDR_CHUNK_TYPE = Buffer.from([0x49, 0x48, 0x44, 0x52]);
const PNG_IEND_CHUNK = Buffer.from([0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);

const FORBIDDEN_POLYGLOT_SIGNATURES: readonly Buffer[] = [
  Buffer.from([0x50, 0x4b, 0x03, 0x04]), // ZIP local file header
  Buffer.from([0x50, 0x4b, 0x05, 0x06]), // ZIP End of Central Directory
  Buffer.from([0x50, 0x4b, 0x07, 0x08]), // ZIP spanned
  Buffer.from([0x4d, 0x5a]),             // DOS/PE MZ executable
  Buffer.from([0x7f, 0x45, 0x4c, 0x46]), // Linux ELF executable
  Buffer.from([0x37, 0x7a, 0xbc, 0xaf]), // 7-Zip
  Buffer.from([0x52, 0x61, 0x72, 0x21]), // RAR
];

const TEXT_POLYGLOT_PATTERNS: readonly string[] = [
  '<script',
  '<?php',
  '<!doctype',
  '<html',
];

@Injectable()
export class FileValidationService {
  validate(
    file: UploadedFile | undefined,
    rules: FileValidationRules,
  ): ValidatedFile {
    if (!file || file.size === 0 || file.buffer.length === 0) {
      throw new EmptyFileException();
    }

    if (file.size > rules.maxSizeBytes || file.buffer.length > rules.maxSizeBytes) {
      throw new FileTooLargeException();
    }

    const signature = this.detectSignature(file.buffer);

    if (!signature || !rules.allowedTypes.includes(signature.type)) {
      throw new InvalidFileTypeException();
    }

    if (!this.isStructurallyIntact(file.buffer, signature.type)) {
      throw new CorruptedFileException();
    }

    return {
      ...file,
      detectedType: signature.type,
      detectedMimeType: signature.mimeType,
    };
  }

  detectMimeType(buffer: Buffer): string | undefined {
    return this.detectSignature(buffer)?.mimeType;
  }

  private detectSignature(buffer: Buffer): FileSignature | undefined {
    return FILE_SIGNATURES.find((signature) =>
      signature.bytes.every((byte, index) => buffer[index] === byte),
    );
  }

  private isStructurallyIntact(buffer: Buffer, type: string): boolean {
    if (type === 'pdf') {
      return this.isPdfIntact(buffer);
    }

    if (type === 'png') {
      return this.isPngIntact(buffer);
    }

    if (type === 'jpg') {
      return this.isJpgIntact(buffer);
    }

    return false;
  }

  private isPdfIntact(buffer: Buffer): boolean {
    if (buffer.length < MIN_REALISTIC_FILE_SIZE) {
      return false;
    }

    if (
      buffer.length < PDF_HEADER.length ||
      !buffer.subarray(0, PDF_HEADER.length).equals(PDF_HEADER)
    ) {
      return false;
    }

    const lastEofIndex = buffer.lastIndexOf(PDF_EOF_MARKER);
    if (lastEofIndex === -1) {
      return false;
    }

    if (buffer.length - lastEofIndex > INTEGRITY_TAIL_BYTES) {
      return false;
    }

    const trailing = buffer.subarray(lastEofIndex + PDF_EOF_MARKER.length);
    return this.isSafeTrailingBytes(trailing);
  }

  private isPngIntact(buffer: Buffer): boolean {
    if (buffer.length < MIN_REALISTIC_FILE_SIZE) {
      return false;
    }

    if (
      buffer.length < PNG_FULL_SIGNATURE.length ||
      !buffer.subarray(0, PNG_FULL_SIGNATURE.length).equals(PNG_FULL_SIGNATURE)
    ) {
      return false;
    }

    if (buffer.length < 16) {
      return false;
    }

    if (!buffer.subarray(12, 16).equals(PNG_IHDR_CHUNK_TYPE)) {
      return false;
    }

    const iendIndex = buffer.lastIndexOf(PNG_IEND_CHUNK);
    if (iendIndex === -1) {
      return false;
    }

    if (buffer.length - iendIndex > INTEGRITY_TAIL_BYTES) {
      return false;
    }

    const trailing = buffer.subarray(iendIndex + PNG_IEND_CHUNK.length);
    return this.isSafeTrailingBytes(trailing);
  }

  private isJpgIntact(buffer: Buffer): boolean {
    if (buffer.length < MIN_REALISTIC_FILE_SIZE) {
      return false;
    }

    if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
      return false;
    }

    let offset = 2;
    let hasSof = false;
    let hasSos = false;
    let eoiOffset = -1;
    let reachedEoi = false;

    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        return false;
      }

      while (offset < buffer.length && buffer[offset] === 0xff) {
        offset++;
      }

      if (offset >= buffer.length) {
        return false;
      }

      const marker = buffer[offset];
      offset++;

      if (marker === 0x00 || marker === 0x20) {
        return false;
      }

      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        continue;
      }

      if (marker === 0xd9) {
        eoiOffset = offset - 2;
        reachedEoi = true;
        break;
      }

      if (offset + 2 > buffer.length) {
        return false;
      }

      const length = buffer.readUInt16BE(offset);
      if (length < 2 || offset + length > buffer.length) {
        return false;
      }

      if (marker === 0xc0 || marker === 0xc2) {
        hasSof = true;
      }

      const isValidPayloadMarker =
        (marker >= 0xc0 && marker <= 0xcf) ||
        (marker >= 0xda && marker <= 0xfe);

      if (!isValidPayloadMarker) {
        return false;
      }

      if (marker === 0xda) {
        hasSos = true;
        offset += length;

        let scanEoiFound = false;
        while (offset < buffer.length) {
          if (buffer[offset] === 0xff) {
            let mOffset = offset + 1;
            while (mOffset < buffer.length && buffer[mOffset] === 0xff) {
              mOffset++;
            }
            if (mOffset < buffer.length) {
              const nextMarker = buffer[mOffset];
              if (nextMarker === 0x00) {
                offset = mOffset + 1;
                continue;
              }
              if (nextMarker >= 0xd0 && nextMarker <= 0xd7) {
                offset = mOffset + 1;
                continue;
              }
              if (nextMarker === 0xd9) {
                eoiOffset = offset;
                offset = mOffset + 1;
                scanEoiFound = true;
                reachedEoi = true;
                break;
              }
              break;
            }
          }
          offset++;
        }

        if (scanEoiFound) {
          break;
        }
        continue;
      }

      offset += length;
    }

    if (!hasSof || !hasSos || !reachedEoi || eoiOffset === -1) {
      return false;
    }

    if (buffer.length - eoiOffset > INTEGRITY_TAIL_BYTES) {
      return false;
    }

    const trailing = buffer.subarray(offset);
    return this.isSafeTrailingBytes(trailing);
  }

  private isSafeTrailingBytes(trailing: Buffer): boolean {
    if (trailing.length === 0) {
      return true;
    }

    if (trailing.length > MAX_SAFE_TRAILING_BYTES) {
      return false;
    }

    for (const signature of FORBIDDEN_POLYGLOT_SIGNATURES) {
      if (this.containsSequence(trailing, signature)) {
        return false;
      }
    }

    const trailingText = trailing.toString('ascii').toLowerCase();
    for (const pattern of TEXT_POLYGLOT_PATTERNS) {
      if (trailingText.includes(pattern)) {
        return false;
      }
    }

    return trailing.every(
      (byte) =>
        byte === 0x00 ||
        byte === 0x0a ||
        byte === 0x0d ||
        byte === 0x20 ||
        byte === 0x09 ||
        byte === 0xff,
    );
  }

  private containsSequence(haystack: Buffer, needle: Buffer): boolean {
    return haystack.includes(needle);
  }
}
