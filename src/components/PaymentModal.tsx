import React, { useState } from 'react';
import { X, ExternalLink, CreditCard, ShieldCheck, Smartphone, Copy, Check } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Datos bancarios (puedes ajustar el nombre del banco o CLABE si lo deseas)
  const bankDetails = {
    bankName: 'Banco Azteca / Mercado Pago',
    clabe: '127180013566372716',
    beneficiary: 'Lior Fisher Lobaton',
    amount: '$200 MXN',
  };

  const handleCopyClabe = () => {
    navigator.clipboard.writeText(bankDetails.clabe);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePayPalPay = () => {
    window.open("https://www.paypal.com/paypalme/gingerjewman0/200MXN", '_blank');
  };

  const handleMercadoPagoPay = () => {
    // Reemplaza con tu enlace de cobro de Mercado Pago de $200 MXN
    window.open("https://mpago.la/26bPTR9", '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-amber-900/50 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabecera del Modal */}
        <div className="p-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⭐</span>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Desbloquear Versión Premium</h3>
              <p className="text-xs text-amber-100 opacity-90">Acceso ilimitado y sin anuncios ($200 MXN)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Modal con Scroll */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-center">
            Elige tu método de pago preferido para realizar tu aportación única de <strong className="text-amber-700 dark:text-amber-400">$200 pesos mexicanos</strong>:
          </p>

          <div className="space-y-3">
            {/* Opción 1: PayPal */}
            <button
              onClick={handlePayPalPay}
              className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/50 dark:hover:bg-slate-800 transition flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-base">
                  P
                </div>
                <div className="text-left">
                  <span className="block font-bold text-sm text-slate-800 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    PayPal / Tarjeta
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    Pago seguro en línea
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
            </button>

            {/* Opción 2: Mercado Pago */}
            <button
              onClick={handleMercadoPagoPay}
              className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/50 dark:hover:bg-slate-800 transition flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-sm text-slate-800 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    Mercado Pago / Tarjetas
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    Débito, crédito o dinero en cuenta
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
            </button>

            {/* Opción 3: Transferencia Bancaria SPEI / OXXO Directa */}
            <div className="p-4 rounded-2xl border-2 border-amber-300 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>Transferencia SPEI o Depósito Directo</span>
              </div>
              
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
                <div className="flex justify-between">
                  <span className="text-slate-500">Banco:</span>
                  <span className="font-semibold">{bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monto:</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">{bankDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Beneficiario:</span>
                  <span className="font-semibold">{bankDetails.beneficiary}</span>
                </div>
                
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="block text-[10px] text-slate-400">CLABE Interbancaria:</span>
                    <span className="font-mono font-bold text-xs">{bankDetails.clabe}</span>
                  </div>
                  <button
                    onClick={handleCopyClabe}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] flex items-center gap-1 transition shrink-0 cursor-pointer"
                    title="Copiar CLABE"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                * Si realizas transferencia SPEI o depósito, puedes notificarlo para activar tu cuenta de inmediato.
              </p>
            </div>
          </div>

          <div className="pt-1 text-center">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Soporte garantizado y activación rápida tras tu aportación.
            </p>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}