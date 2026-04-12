"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { WizardState, EventType } from "@/types";

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

  const update = (partial: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  };

  const reset = () => setState(defaultState);

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
