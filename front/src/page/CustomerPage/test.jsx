import React from 'react'

//todo 0 import useNavigate เข้ามาจาก react-router-dom
import { useNavigate } from 'react-router-dom'

function test() {

    //todo 1 สร้างตัวแปรมาเก็บ useNavigate เพื่อใชเกำหนดเส้นทาง
    const navigate = useNavigate()


  return (
    <div>

        //todo 2 กำหนด even ปุ่ม โดยใช้ onClick โดยส่งไปให้ navigate ทำงานแล้วเลือกหน้าที่่ต้องการจะไป
        <button onClick={() => navigate('/หน้าที่ต้องการ')}>ปุ่มกด</button>
    </div>
  )
}

export default test