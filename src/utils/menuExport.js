export const copyTextToClipboard = async (text) => {
  if (!text.trim()) {
    return {
      ok: false,
      message: 'Genera el texto antes de copiar.',
      status: 'error',
    }
  }

  try {
    await navigator.clipboard.writeText(text)
    return {
      ok: true,
      message: 'Texto copiado al portapapeles.',
      status: 'success',
    }
  } catch {
    return {
      ok: false,
      message: 'No se pudo copiar. Copia manualmente el texto.',
      status: 'error',
    }
  }
}

export const downloadTextFile = (text, fileName) => {
  if (!text.trim()) {
    return {
      ok: false,
      message: 'Genera el texto antes de descargar.',
      status: 'error',
    }
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  return {
    ok: true,
    message: 'Archivo .txt descargado.',
    status: 'success',
  }
}
