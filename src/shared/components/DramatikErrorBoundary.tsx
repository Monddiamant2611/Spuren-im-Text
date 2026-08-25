"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

export function DramatikErrorFallback({ onRecover }: { onRecover: () => void }) {
  return <main className="dramatik-error" role="alert"><section><h1>Das Theater braucht einen neuen Anlauf.</h1><p>Der aktuelle Spielbereich konnte nicht angezeigt werden. Ihr gespeicherter Lernstand bleibt, soweit verfügbar, erhalten.</p><button onClick={onRecover}>Zurück zum Theater</button></section></main>;
}

export class DramatikErrorBoundary extends Component<{ children: ReactNode; onRecover?: () => void }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) { void _error; void _info; }
  private recover = () => {
    this.setState({ hasError: false });
    if (this.props.onRecover) this.props.onRecover();
    else window.location.assign(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/dramatik/`);
  };
  render() { return this.state.hasError ? <DramatikErrorFallback onRecover={this.recover}/> : this.props.children; }
}
