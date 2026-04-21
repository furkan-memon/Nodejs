import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false,
  auth:{
    user:"rw5.vivek.mk@gmail.com",
    pass:"yn7uidHSWrsvnN5"
  }
})

const sendEmail = async(message) =>{
  let response = await transporter.sendMail(message)
  console.log(response);
}

export default sendEmail