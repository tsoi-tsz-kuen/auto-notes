# -*- coding: utf-8 -*-
# @date    : 2022/2/24 5:00 下午
# @email   : 312141830@qq.com

# recorder + asr + translate
# use settings to set lang

import multiprocessing
import uuid
import time
import numpy as np
import os
import sounddevice as sd
import scipy.io.wavfile
from vosk import Model, KaldiRecognizer, SetLogLevel
import wave
import json
from deep_translator import GoogleTranslator
import warnings

    # 忽略FutureWarning
warnings.simplefilter(action='ignore', category=FutureWarning)

    # 忽略UserWarning
warnings.simplefilter(action='ignore', category=UserWarning)

# settings
start_time = time.time()  # 子进程这个starttime会重算
from_lang = 'en'
to_lang = 'zh-cn'
google_trans_API = 'translate.googleapis.com'  # can be translate.googleapis.com
record_duration = 4 * 60  # record 4min for a single time, you can change it as you like

##
SetLogLevel(-1)
RECORD_SEG_TIME = 4
SAMPLE_RATE = 48000


import sounddevice as sd
import scipy.io.wavfile as wav
from pydub import AudioSegment

def record_wav(wav_path, seconds):
    SAMPLE_RATE = 44100
    SECONDS = seconds

    # Channels
    MONO = 1  # 必須是mono

    # Device you want to record
    sd.default.device[0] = 1  # 設置此索引為您的麥克風設備！（在Mac上是黑洞，Windows上是Stereo Mix）
    sd.default.samplerate = SAMPLE_RATE

    recording = sd.rec(int(SECONDS * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=MONO, dtype=np.int16)
    sd.wait()  # 等待錄音結束
    wav.write(wav_path, SAMPLE_RATE, recording)  # 保存為WAV格式

    # 將WAV轉換為MP3
    # audio = AudioSegment.from_wav(wav_path)
    # mp3_path = wav_path.replace(".wav", ".mp3")
    # audio.export(mp3_path, format="mp3")
    # return mp3_path
    return wav_path



def translate(eng_text, to_lang='zh-CN', from_lang='auto'):
    translator = GoogleTranslator(source=from_lang, target=to_lang)
    return translator.translate(eng_text)


def asr(wav_path):
    model = Model("model")
    rec = KaldiRecognizer(model, SAMPLE_RATE)
    rec.SetWords(True)
    wf = wave.open(wav_path, "rb")

    content = ''
    while True:
        data = wf.readframes(4800)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):  # 这里有个问题，不同线程的数据可能会混掉
            text_str = rec.Result()
            text = json.loads(text_str).get("text")
            content += text
            content += ' '

    text_str = rec.FinalResult()
    text = json.loads(text_str).get("text")
    content += text
    if content:
        print(content, end=' ')
        print(translate(content))
    return

# import whisper

# def asr(wav_path):
#     model = whisper.load_model('base')
#     content = ''

#     result = model.transcribe(wav_path)
#     if result:
#         content += result['text']
#         content += ' '

#     if content:
#         print(content, end=' ')
#         print(translate(content))
#     return content


def clean_tmp_files():
    path = 'tmp/'
    for i in os.listdir(path):
        path_file = os.path.join(path, i)
        if os.path.isfile(path_file):
            os.remove(path_file)


def record_thread():
    wav_path = 'tmp/%s.wav' % uuid.uuid4()
    record_wav(wav_path, RECORD_SEG_TIME)
    asr(wav_path)




def main():
    print('start recording')
    clean_tmp_files()
    for i in range(int(record_duration / RECORD_SEG_TIME) + 1):
        p = multiprocessing.Process(target=record_thread, args=())  # target不能带括号！
        p.start()
        time.sleep(RECORD_SEG_TIME)
    print('recording finished')

def print_devices():
    print('you may need to modify code of your speaker device in record_wav() function')
    print(sd.query_devices())  # 打印设备列表
    # Command to get all devices listed: py -m sounddevice

if __name__ == '__main__':

    print_devices()
    main()


