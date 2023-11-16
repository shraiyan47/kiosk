import QRCode from 'qrcode.react'


export default function QrGen(param) {

  return (
    <>
      <p>
        Email: {param.qr}
      </p>
          <QRCode value={param.qr} size={100} />
    </>
  )
}
