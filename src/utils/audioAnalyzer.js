export async function analyzeAudio(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()

  const offlineContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
    1,
    2,
    44100
  )

  const audioBuffer = await offlineContext.decodeAudioData(arrayBuffer)
  const sampleRate = audioBuffer.sampleRate
  const channelData = audioBuffer.getChannelData(0)
  const windowDuration = 0.05 // 50 ms windows
  const windowSize = Math.floor(sampleRate * windowDuration)
  const windowCount = Math.ceil(channelData.length / windowSize)
  const amplitudes = new Float32Array(windowCount)

  for (let i = 0; i < windowCount; i++) {
    let sum = 0
    const start = i * windowSize
    const end = Math.min(start + windowSize, channelData.length)
    for (let j = start; j < end; j++) {
      sum += channelData[j] * channelData[j]
    }
    amplitudes[i] = Math.sqrt(sum / (end - start))
  }

  // Normalize to 0..1 using a safe upper bound
  const maxAmp = Math.max(...amplitudes)
  const normalizedMax = maxAmp > 0 ? maxAmp : 1
  for (let i = 0; i < windowCount; i++) {
    amplitudes[i] = amplitudes[i] / normalizedMax
  }

  return {
    amplitudes,
    windowDuration,
    sampleRate,
    duration: audioBuffer.duration,
  }
}

export function getAmplitudeAtTime(audioData, time) {
  if (!audioData?.amplitudes?.length) return 0
  const { amplitudes, windowDuration } = audioData
  const index = Math.floor(time / windowDuration)
  if (index < 0) return amplitudes[0]
  if (index >= amplitudes.length) return amplitudes[amplitudes.length - 1]
  return amplitudes[index]
}
