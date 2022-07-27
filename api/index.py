# coding:utf-8
import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from api.make_bookmark import make_bookmark

app = FastAPI()
# 添加跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    allow_credentials=True,
)


@app.post('/api')
async def uploadFile(file: UploadFile = File(...)):
    """缺少验证是否上传文件"""
    content = await file.read()
    return make_bookmark(content)


if __name__ == "__main__":
    uvicorn.run("index:app", host="127.0.0.1", port=3000, log_level="info")