import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enable2FA, setEnable2FA] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8443/api/register", {
        username,
        password,
        enable2FA,
      });

      if (response.data.qrCodeUrl) {
        setQrCodeUrl(response.data.qrCodeUrl);
      } else {
        // Handle successful registration without 2FA
        console.log("User registered:", response.data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <label>
          <input
            type="checkbox"
            checked={enable2FA}
            onChange={(e) => setEnable2FA(e.target.checked)}
          />
          Enable 2FA
        </label>
        <button type="submit">Register</button>
      </form>
      {qrCodeUrl && (
        <div>
          <p>Scan this QR code with your 2FA app:</p>
          <img src={qrCodeUrl} alt="2FA QR Code" />
        </div>
      )}
    </div>
  );
};

export default Register;
