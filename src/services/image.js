export const base64ToFile = (string,name) =>{
  const arr = string.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  for(let i = 0;i < bstr.length;i++){
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], name, { type: mime });
}

export const base64ToArrayBuffer = (string) =>{
  const arr = string.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const binaryString = atob(arr[1]);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return [bytes.buffer,mime];
}