const lletres = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const simbols = [',', '.', '!', ';', '-', '?', "'"];
const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function encriptar(textNormal: string): string {
  const codificacio = Math.floor(Math.random() * 6) + 5; // Random between 5 and 10
  const textCodificat: string[] = [];
  const normalizedText = removeAccents(textNormal);
  const codi = codificacio + normalizedText.length;
  
  textCodificat.push(codi.toString());
  
  for (const char of normalizedText) {
    if (char === " ") {
      textCodificat.push("Ñ");
    } else if (lletres.includes(char.toLowerCase())) {
      const posicioOriginal = lletres.indexOf(char.toLowerCase());
      const posicioCodificada = (posicioOriginal + codificacio) % 26;
      textCodificat.push(lletres[posicioCodificada]);
    } else if (simbols.includes(char.toLowerCase())) {
      const posicioOriginal = simbols.indexOf(char.toLowerCase());
      const posicioCodificada = (posicioOriginal + codificacio) % 7;
      textCodificat.push(simbols[posicioCodificada]);
    } else if (numeros.includes(char.toLowerCase())) {
      const posicioOriginal = numeros.indexOf(char.toLowerCase());
      const posicioCodificada = (posicioOriginal + codificacio) % 10;
      textCodificat.push(numeros[posicioCodificada]);
    }
  }
  
  return textCodificat.join('');
}

export function desencriptar(textCodificat: string): string {
  const textSenseCodi: string[] = [];
  const textReal: string[] = [];
  
  // Extract the code at the beginning
  const codiVisibleMatch = textCodificat.match(/^\d{1,3}/);
  if (!codiVisibleMatch) {
    return "El texto encriptado no es válido.";
  }
  
  const resultatCodiVisible = codiVisibleMatch[0];
  
  // Get text without the code
  for (let i = resultatCodiVisible.length; i < textCodificat.length; i++) {
    textSenseCodi.push(textCodificat[i]);
  }
  
  const longitudText = textSenseCodi.length;
  const codiReal = parseInt(resultatCodiVisible) - longitudText;
  
  for (const char of textSenseCodi) {
    if (char === "Ñ") {
      textReal.push(" ");
    } else if (lletres.includes(char.toLowerCase())) {
      const posicioCodificada = lletres.indexOf(char.toLowerCase());
      const posicioReal = (posicioCodificada - codiReal + 26) % 26;
      textReal.push(lletres[posicioReal]);
    } else if (simbols.includes(char.toLowerCase())) {
      const posicioCodificada = simbols.indexOf(char.toLowerCase());
      const posicioReal = (posicioCodificada - codiReal + 7) % 7;
      textReal.push(simbols[posicioReal]);
    } else if (numeros.includes(char.toLowerCase())) {
      const posicioCodificada = numeros.indexOf(char.toLowerCase());
      const posicioReal = (posicioCodificada - codiReal + 10) % 10;
      textReal.push(numeros[posicioReal]);
    }
  }
  
  return textReal.join('');
}
