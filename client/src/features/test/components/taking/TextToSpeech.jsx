import React, { useState } from "react";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const TextToSpeech = ({ text = "xin chào mình là Minh" }) => {
  const [audioUrl, setAudioUrl] = useState("");

  const synthesizeSpeech = async () => {
    // Replace 'YOUR_API_KEY' with your actual API key or set up authentication with a service account key file
    const client = new TextToSpeechClient({
      keyFilename: "./application_default_credentials.json",
    });

    const request = {
      input: { text: "Hello, World!" },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };

    try {
      const [response] = await client.synthesizeSpeech(request);
      const audioContent = response.audioContent;

      const audioBlob = new Blob([audioContent], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={synthesizeSpeech}>Synthesize Speech</button>
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

export default TextToSpeech;
