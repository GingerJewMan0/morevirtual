import React, { useState } from 'react';
import { X, ExternalLink, CreditCard, ShieldCheck, Smartphone, Copy, Check, Heart, Star, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'premium' | 'donate'>('premium');
  const [customAmount, setCustomAmount] = useState('10');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bankDetails = {
    bankName: 'Banco Azteca / Mercado Pago (México)',
    clabe: '127180013566372716',
    beneficiary: 'Lior Fisher Lobaton',
  };

  const handleCopyClabe = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-amber-900/50 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabecera del Modal */}
        <div className="p-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-amber-100" />
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">{t('paymentModalTitle', 'Apoyo Internacional & Premium')}</h3>
              <p className="text-xs text-amber-100 opacity-90">{t('appName')} — Global Torah & Tech</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Navegación Interna */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('premium')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'premium'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>{t('tabVersionPremium', 'Versión Premium ($10 USD / $200 MXN)')}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('donate')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'donate'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>{t('tabFreeDonation', 'Donativo Libre')}</span>
          </button>
        </div>

        {/* Cuerpo del Modal con Scroll */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* VISTA 1: PREMIUM INTERNACIONAL */}
          {activeTab === 'premium' && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-center">
                {t('premiumDesc', 'Desbloquea acceso ilimitado y sin anuncios a nivel mundial por')} <strong className="text-amber-700 dark:text-amber-400">$10 USD / $200 MXN</strong>:
              </p>

              <div className="space-y-3">
                {/* PayPal Internacional ($10 USD) */}
                <button
                  onClick={() => window.open("https://www.paypal.com/paypalme/gingerjewman0/10USD", '_blank')}
                  className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">P</div>
                    <div className="text-left">
                      <span className="block font-bold text-sm text-slate-800 dark:text-white group-hover:text-amber-600">{t('paypalGlobalTitle', 'PayPal / Tarjeta Internacional')}</span>
                      <span className="block text-[11px] text-slate-500">{t('paypalGlobalSub', 'Pago global de $10 USD')}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>

                {/* Mercado Pago (Exclusivo para México) */}
                <button
                  onClick={() => window.open("https://mpago.la/26bPTR9", '_blank')}
                  className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center font-bold"><CreditCard className="w-4 h-4" /></div>
                    <div className="text-left">
                      <span className="block font-bold text-sm text-slate-800 dark:text-white group-hover:text-amber-600">
                        {t('mercadoPagoTitle', 'Mercado Pago')} <span className="text-[10px] font-normal text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-md ml-1">{t('onlyMexico', 'Solo México')}</span>
                      </span>
                      <span className="block text-[11px] text-slate-500">{t('mercadoPagoSub', 'Tarjetas o efectivo en pesos ($200 MXN)')}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>

                {/* SPEI Nacional */}
                <div className="p-3.5 rounded-2xl border-2 border-amber-300 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                    <Smartphone className="w-4 h-4 text-amber-600" />
                    <span>{t('speiTitle', 'Transferencia SPEI (México - $200 MXN)')}</span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200/60">
                    <div className="flex justify-between">
                      <span className="text-slate-500">CLABE:</span>
                      <span className="font-mono font-bold">{bankDetails.clabe}</span>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleCopyClabe(bankDetails.clabe)}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? t('copiedText', '¡Copiado!') : t('copyClabeBtn', 'Copiar CLABE')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: DONATIVO LIBRE INTERNACIONAL */}
          {activeTab === 'donate' && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-center">
                {t('donationDesc', 'Apoya voluntariamente el mantenimiento del proyecto global eligiendo el monto de tu preferencia (USD):')}
              </p>

              {/* Selector de montos en USD */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">{t('selectAmountLabel', 'Selecciona un monto (USD):')}</label>
                <div className="grid grid-cols-4 gap-2">
                  {['5', '10', '25', '50'].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setCustomAmount(amount)}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        customAmount === amount
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      ${amount} USD
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => window.open(`https://www.paypal.com/paypalme/gingerjewman0/${customAmount}USD`, '_blank')}
                  className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">P</div>
                    <div className="text-left">
                      <span className="block font-bold text-sm text-slate-800 dark:text-white group-hover:text-amber-600">{t('donateWithPaypal', 'Donar con PayPal')} (${customAmount} USD)</span>
                      <span className="block text-[11px] text-slate-500">{t('secureInternationalSupport', 'Aportación internacional segura')}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => window.open("https://mpago.la/26bPTR9", '_blank')}
                  className="w-full p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/60 transition flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center font-bold"><CreditCard className="w-4 h-4" /></div>
                    <div className="text-left">
                      <span className="block font-bold text-sm text-slate-800 dark:text-white group-hover:text-amber-600">
                        {t('mercadoPagoTitle', 'Mercado Pago')} <span className="text-[10px] font-normal text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-md ml-1">{t('onlyMexico', 'Solo México')}</span>
                      </span>
                      <span className="block text-[11px] text-slate-500">{t('localPesoSupport', 'Aportación local en pesos')}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          )}

          <div className="pt-1 text-center">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t('secureGlobalTransactions', 'Transacciones seguras a nivel global. ¡Gracias por tu apoyo!')}
            </p>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition cursor-pointer"
          >
            {t('close', 'Cerrar')}
          </button>
        </div>

      </div>
    </div>
  );
}

export default PaymentModal;