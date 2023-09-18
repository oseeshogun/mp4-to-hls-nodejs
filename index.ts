import ffmpeg from 'fluent-ffmpeg'
import readline from 'readline'
import fs from 'fs'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

prompt.question('Video a convertir: ', (video) => {
  if (!fs.existsSync('./output/')) {
    fs.mkdirSync('./output/')
  } else {
    fs.rmdirSync('./output/', { recursive: true })
    fs.mkdirSync('./output/')
  }
  ffmpeg(video, { timeout: 432000 })
    .addOptions([
      '-profile:v baseline',
      '-level 3.0',
      '-start_number 0',
      '-hls_time 10',
      '-hls_list_size 0',
      '-f hls',
    ])
    .output('./output/output.m3u8')
    .on('progress', (progress) => console.log(progress))
    .on('error', (progress) => console.log(progress))
    .on('end', () => {
      console.log('Process fini 🔥')
    })
    .run()

  prompt.close()
})
