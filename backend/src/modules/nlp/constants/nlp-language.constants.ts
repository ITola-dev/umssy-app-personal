// Spanish stopwords (plus a few English ones), written without accents because the text is normalized first.
// Negation words are not stopwords: the detector needs them to read the context of a mention.
export const NLP_STOPWORDS: ReadonlySet<string> = new Set([
  'a', 'al', 'algo', 'algun', 'alguna', 'algunas', 'alguno', 'algunos', 'ante', 'antes', 'asi', 'cada',
  'como', 'con', 'contra', 'cual', 'cuales', 'cuando', 'de', 'del', 'desde', 'donde', 'durante', 'e',
  'el', 'ella', 'ellas', 'ellos', 'en', 'entre', 'era', 'eran', 'es', 'esa', 'esas', 'ese', 'eso', 'esos',
  'esta', 'estaba', 'estado', 'estan', 'estar', 'este', 'esto', 'estos', 'fue', 'fueron', 'ha', 'han',
  'hasta', 'hay', 'la', 'las', 'le', 'les', 'lo', 'los', 'me', 'mi', 'mis', 'muy', 'mas', 'nos', 'nuestra',
  'nuestras', 'nuestro', 'nuestros', 'o', 'otra', 'otras', 'otro', 'otros', 'para', 'por', 'porque', 'que',
  'se', 'ser', 'si', 'sido', 'sobre', 'su', 'sus', 'tambien', 'te', 'tiene', 'tienen', 'tu', 'tus', 'un',
  'una', 'unas', 'uno', 'unos', 'y', 'ya', 'yo',
  'an', 'and', 'as', 'at', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with',
]);
