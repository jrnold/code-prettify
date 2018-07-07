/**
 * @license
 * Copyright (C) 2018 Jeffrey B. Arnold
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for Stan models
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-stan"> code </pre>
 *
 * The manual included in Stan Modeling Language User's Guide and Reference Manual, Version 2.17.0,
 * https://github.com/stan-dev/stan/releases/download/v2.17.0/stan-reference-2.17.0.pdf
 * is basis for this grammar.
 *
 * @author Jeffrey B. Arnold <jeffrey.arnold@gmail.com>
 */
PR['registerLangHandler'](
  PR['createSimpleLexer'](
    [
      // Whitespace is made up of spaces, tabs and newline characters.
      [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
    ], [
      // Err on the side of conservative: only include control keywords, types
      // don't include T[] and lower=, upper since they can occur in other contexts
      [PR['PR_TYPE'], /^(?:int|real|(?:row_|unit_)?vector|(?:positive_)?ordered|simplex|(?:(?:corr|cov)_)?matrix|cholesky_factor(?:corr|cov)|void)\b/],
      [PR['PR_COMMENT'], /^(?:(\/\/|#)[^\r\n]*|\/\*[\s\S]*?\*\/)/],
      [PR['PR_KEYWORD'], /^(?:for|in|if|else|while|continue|break|print|reject|return|(transformed\s+)?(parameters|data)|model|generated\s+quantities)\b/, null],
      [PR['PR_LITERAL'], /^(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+-]?\d+)?)/i],
      [PR['PR_STRING'], /"[^"]*?"/],
      [PR['PR_PUNCTUATION'], /^\+|-|\.?\*|\.?\/|<-|~|{|}|\(|\)|;|,|:|\[|\]|\\|<=?|>=?|!=?|==?|&&|\|{2}|'/],
      [PR['PR_PLAIN'], /^[A-Za-z][A-Za-z0-9_]*\b/]
    ]), ['stan']);
