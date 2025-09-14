import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Play, Eye, Image, Phone, Mail } from "lucide-react";

interface EvidenceData {
  id: string;
  merchantName: string;
  type: string;
  description: string;
  confirmationId: string;
  method: string;
  saved: string;
  completedDate: string;
}

interface EvidenceCardProps {
  evidence: EvidenceData;
  'data-testid'?: string;
}

export default function EvidenceCard({ evidence, 'data-testid': testId }: EvidenceCardProps) {
  const getMerchantInitial = () => {
    return evidence.merchantName.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  };

  const getMerchantColor = () => {
    const colors: { [key: string]: string } = {
      'Netflix': 'bg-red-600',
      'LA Fitness': 'bg-orange-500',
      'Dropbox Plus': 'bg-blue-500'
    };
    return colors[evidence.merchantName] || 'bg-primary';
  };

  const getEvidenceIcon = () => {
    switch (evidence.type) {
      case 'screenshot':
        return <Image className="text-muted-foreground h-6 w-6" />;
      case 'recording':
        return <Phone className="text-muted-foreground h-6 w-6" />;
      case 'email':
        return <Mail className="text-muted-foreground h-6 w-6" />;
      default:
        return <Image className="text-muted-foreground h-6 w-6" />;
    }
  };

  const getEvidenceTitle = () => {
    switch (evidence.type) {
      case 'screenshot':
        return 'Portal Screenshot';
      case 'recording':
        return 'Call Recording';
      case 'email':
        return 'Email Receipt';
      default:
        return 'Evidence';
    }
  };

  const getActionButton = () => {
    switch (evidence.type) {
      case 'recording':
        return (
          <Button 
            className="w-full bg-primary/10 text-primary hover:bg-primary/20"
            data-testid="button-play-recording"
          >
            <Play className="mr-2 h-4 w-4" />
            Play Recording
          </Button>
        );
      case 'email':
        return (
          <Button 
            className="w-full bg-primary/10 text-primary hover:bg-primary/20"
            data-testid="button-view-email"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Email
          </Button>
        );
      default:
        return (
          <Button 
            className="w-full bg-primary/10 text-primary hover:bg-primary/20"
            data-testid="button-download-evidence"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Evidence
          </Button>
        );
    }
  };

  return (
    <Card data-testid={testId}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${getMerchantColor()} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-xs">
                {getMerchantInitial()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground" data-testid="text-merchant-name">
                {evidence.merchantName}
              </h3>
              <p className="text-xs text-muted-foreground" data-testid="text-completion-date">
                Completed {evidence.completedDate}
              </p>
            </div>
          </div>
          <Badge className="bg-success/10 text-success border-success/20">
            Verified
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="bg-muted rounded-lg p-4 border border-border">
            <div className="text-center">
              {getEvidenceIcon()}
              <div className="text-sm font-medium text-foreground mt-2" data-testid="text-evidence-title">
                {getEvidenceTitle()}
              </div>
              <div className="text-xs text-muted-foreground" data-testid="text-evidence-description">
                {evidence.description}
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Confirmation ID</span>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded" data-testid="text-confirmation-id">
              {evidence.confirmationId}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Method</span>
            <span className="text-foreground" data-testid="text-cancellation-method">
              {evidence.method}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Saved</span>
            <span className="text-success font-medium" data-testid="text-amount-saved">
              {evidence.saved}
            </span>
          </div>

          {getActionButton()}
        </div>
      </CardContent>
    </Card>
  );
}
