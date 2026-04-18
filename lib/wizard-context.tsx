"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { WizardState } from "@/types";

const defaultState: WizardState = {
  eventType: null,
  eventDate: "",
  recipientName: "",
  recipientEmail: "",
  recipientRelationship: "",
  mailingAddress: undefined,
  senderName: "",
  fromNote: "",
  selectedPrompt: "",
  customPrompt: "",
  audioBlob: null,
  audioUrl: null,
  recordingDuration: 0,
  transcript: "",
  letterText: "",
  year: "",
  packageId: null,
};

interface WizardContextType {
  state: WizardState;
  update: (partial: Partial<WizardState>) => void;
  reset: () => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wizard_progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Restore state but clear non-serializable fields
        setState({ ...defaultState, ...parsed, audioBlob: null, audioUrl: null });
      }
    } catch {}
    setLoaded(true);
  }, []);

  const update = (partial: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  };

  const reset = () => {
    setState(defaultState);
    try { localStorage.removeItem("wizard_progress"); } catch {}
  };

  if (!loaded) return null;

  return (
    <WizardContext.Provider value={{ state, update, reset }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
