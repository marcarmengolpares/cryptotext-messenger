import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface CryptoCardProps {
  title: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  buttonText: string;
  inputValue: string;
  outputValue: string;
  onInputChange: (value: string) => void;
  onProcess: () => void;
  icon: React.ReactNode;
}

export const CryptoCard = ({
  title,
  inputPlaceholder,
  outputPlaceholder,
  buttonText,
  inputValue,
  outputValue,
  onInputChange,
  onProcess,
  icon,
}: CryptoCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (outputValue) {
      await navigator.clipboard.writeText(outputValue);
      setCopied(true);
      toast({
        title: "Copiat!",
        description: "El text s'ha copiat al porta-retalls",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="p-8 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">{icon}</div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">
            Missatge d'entrada
          </label>
          <Textarea
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[120px] bg-input border-border focus:border-primary text-foreground resize-none"
          />
        </div>

        <Button
          onClick={onProcess}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-glow-primary transition-all duration-300"
        >
          {buttonText}
        </Button>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-muted-foreground">Resultat</label>
            {outputValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-muted-foreground hover:text-primary"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          <Textarea
            placeholder={outputPlaceholder}
            value={outputValue}
            readOnly
            className="min-h-[120px] bg-muted border-border text-foreground font-mono resize-none"
          />
        </div>
      </div>
    </Card>
  );
};
