import { useEffect, useState } from "react";

const SITE_KEY = "6LcIbUMsAAAAAHM7OYydYIFJpCRBPN4YJwdC7Dx";

const RecaptchaTest = () => {
  const [Recaptcha, setRecaptcha] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    import("react-google-recaptcha").then((mod) => {
      setRecaptcha(() => mod.default);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>reCAPTCHA Test</h2>

      {Recaptcha && (
        <Recaptcha
          sitekey={SITE_KEY}
          onChange={(value: string | null) => setToken(value)}
        />
      )}

      {token && (
        <p style={{ marginTop: 10, color: "green" }}>
          ✔ Verified successfully
        </p>
      )}
    </div>
  );
};

export default RecaptchaTest;
