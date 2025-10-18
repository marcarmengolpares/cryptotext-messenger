import { useState } from "react";
import { CryptoCard } from "@/components/CryptoCard";
import { Lock, Unlock } from "lucide-react";
import { encriptar, desencriptar } from "@/utils/cryptoText";

const Index = () => {
  const [encryptInput, setEncryptInput] = useState("");
  const [encryptOutput, setEncryptOutput] = useState("");
  const [decryptInput, setDecryptInput] = useState("");
  const [decryptOutput, setDecryptOutput] = useState("");

  const handleEncrypt = () => {
    if (encryptInput.trim()) {
      const encrypted = encriptar(encryptInput);
      setEncryptOutput(encrypted);
    }
  };

  const handleDecrypt = () => {
    if (decryptInput.trim()) {
      const decrypted = desencriptar(decryptInput);
      setDecryptOutput(decrypted);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-cyber flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CryptoText
            </h1>
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            Encripta y desencripta mensajes de forma segura
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Encrypt Section */}
          <CryptoCard
            title="Encriptar"
            inputPlaceholder="Escribe tu mensaje aquí..."
            outputPlaceholder="Tu mensaje encriptado aparecerá aquí"
            buttonText="Encriptar Mensaje"
            inputValue={encryptInput}
            outputValue={encryptOutput}
            onInputChange={setEncryptInput}
            onProcess={handleEncrypt}
            icon={<Lock className="w-6 h-6" />}
          />

          {/* Decrypt Section */}
          <CryptoCard
            title="Desencriptar"
            inputPlaceholder="Pega tu mensaje encriptado aquí..."
            outputPlaceholder="Tu mensaje desencriptado aparecerá aquí"
            buttonText="Desencriptar Mensaje"
            inputValue={decryptInput}
            outputValue={decryptOutput}
            onInputChange={setDecryptInput}
            onProcess={handleDecrypt}
            icon={<Unlock className="w-6 h-6" />}
          />
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="p-6 rounded-lg bg-gradient-cyber border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ¿Cómo funciona?
            </h3>
            <p className="text-muted-foreground text-sm">
              CryptoText utiliza un algoritmo de cifrado por sustitución con desplazamiento aleatorio.
              Cada mensaje se encripta con un código único, asegurando que el mismo texto produzca
              diferentes resultados cada vez.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
