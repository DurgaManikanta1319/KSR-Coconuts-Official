'use client';

/**
 * Generates a dynamic, context-aware WhatsApp message for KSR COCONUTS™
 * based on the user's action, section, and specific product selected.
 * 
 * @param section The section identifier where the interaction occurred
 * @param buttonText The text label of the clicked button
 * @param productName Optional name of the selected product
 * @returns An encoded WhatsApp URL string or the raw formatted message
 */
export function generateWhatsAppMessage(
  section: 'hero' | 'products' | 'wholesale' | 'founder' | 'gallery' | 'offers' | 'contact' | 'footer' | 'popup',
  buttonText: string,
  productName?: string
): string {
  const brandHeader = '🌴 KSR COCONUTS™';
  let messageBody = '';

  switch (section) {
    case 'products':
      const product = productName || 'Premium Coconuts';
      messageBody = `Interested in:\n${product}\n\nPlease share price and availability.`;
      break;

    case 'wholesale':
      if (buttonText.toLowerCase().includes('dealer')) {
        messageBody = `Interested in becoming a registered dealer.\n\nPlease share:\n• Dealership requirements\n• Partner catalog\n• Distribution details`;
      } else {
        messageBody = `Interested in bulk supply.\n\nPlease share:\n• Wholesale pricing\n• Minimum Order Quantity (MOQ)\n• Delivery lead times`;
      }
      break;

    case 'founder':
      messageBody = `Hello Team,\n\nI am interested in exploring business partnership or investment opportunities with KSR Coconuts.\n\nPlease connect me with the management.`;
      break;

    case 'gallery':
      messageBody = `Interested in viewing your product catalogue.\n\nPlease share the latest price catalog and farm pictures.`;
      break;

    case 'offers':
      messageBody = `Interested in your special harvest offers.\n\nPlease share details and eligibility.`;
      break;

    case 'contact':
      messageBody = `Hello Team,\n\nI'd like to know more about your products and services.\n\nPlease contact me at your earliest convenience.`;
      break;

    case 'footer':
      messageBody = `Hello KSR Coconuts,\n\nI would like to make a business enquiry. Please share details of your trade services.`;
      break;

    case 'popup':
      messageBody = `Interested in your launch announcement details.\n\nPlease share more information about KSR Coconuts™ services.`;
      break;

    case 'hero':
    default:
      if (buttonText.toLowerCase().includes('order')) {
        messageBody = `Hello KSR Coconuts,\n\nI want to place an order for fresh coconuts. Please guide me with availability.`;
      } else if (buttonText.toLowerCase().includes('wholesale')) {
        messageBody = `Hello KSR Coconuts,\n\nI want to enquire about bulk/wholesale supply pricing.`;
      } else {
        messageBody = `Hello Team,\n\nI'd like to get in touch with KSR Coconuts regarding your fresh farm products.`;
      }
      break;
  }

  const fullMessage = `${brandHeader}\n\n${messageBody}\n\nThank you.`;
  return `https://wa.me/919989152333?text=${encodeURIComponent(fullMessage)}`;
}
