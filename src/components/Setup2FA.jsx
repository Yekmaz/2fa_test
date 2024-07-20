import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Setup2FA = ({ userId }) => {
  const [qrCode, setQrCode] = useState("");

  const setup2FA = async () => {
    try {
      const response = await axios.post("http://localhost:8443/api/setup-2fa", {
        userId,
      });
      setQrCode(response.data.qrCodeUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={setup2FA}>Setup 2FA</button>
      {qrCode && <img src={qrCode} alt="2FA QR Code" />}
    </div>
  );
};

export default Setup2FA;
