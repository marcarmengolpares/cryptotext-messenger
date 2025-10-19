import { useState } from "react";
import { CryptoCard } from "@/components/CryptoCard";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Lock, Unlock } from "lucide-react";
import { encriptar, desencriptar } from "@/utils/cryptoText";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
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

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
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
            Encripta i desencripta missatges de forma segura
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Encrypt Section */}
          <CryptoCard
            title="Encriptar"
            inputPlaceholder="Escriu el teu missatge aquí..."
            outputPlaceholder="El teu missatge encriptat apareixerà aquí"
            buttonText="Encriptar Missatge"
            inputValue={encryptInput}
            outputValue={encryptOutput}
            onInputChange={setEncryptInput}
            onProcess={handleEncrypt}
            icon={<Lock className="w-6 h-6" />}
          />

          {/* Decrypt Section */}
          <CryptoCard
            title="Desencriptar"
            inputPlaceholder="Enganxa el teu missatge encriptat aquí..."
            outputPlaceholder="El teu missatge desencriptat apareixerà aquí"
            buttonText="Desencriptar Missatge"
            inputValue={decryptInput}
            outputValue={decryptOutput}
            onInputChange={setDecryptInput}
            onProcess={handleDecrypt}
            icon={<Unlock className="w-6 h-6" />}
          />
        </div>

        {/* Footer Info */}
        <div className="mt-16 space-y-6 text-center max-w-2xl mx-auto">
          <div className="p-6 rounded-lg bg-gradient-cyber border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Com funciona?
            </h3>
            <p className="text-muted-foreground text-sm">
              CryptoText utilitza un algoritme de xifratge per substitució amb desplaçament aleatori.
              Cada missatge s'encripta amb un codi únic, assegurant que el mateix text produeixi
              resultats diferents cada vegada.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">
              ⚠️ Important: No es poden utilitzar els caràcters especials "Ñ" ni alguns símbols en el text original.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
