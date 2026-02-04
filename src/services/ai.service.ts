import { Injectable } from '@angular/core';
import { GoogleGenAI, Chat } from "@google/genai";

@Injectable({ providedIn: 'root' })
export class AiService {
  private ai: GoogleGenAI | null = null;

  private getApiKey(): string {
    const metaEnv = (typeof import.meta !== 'undefined' && (import.meta as any).env) ? (import.meta as any).env : undefined;
    const processEnv = (typeof process !== 'undefined' && (process as any).env) ? (process as any).env : undefined;

    return (
      metaEnv?.GEMINI_API_KEY ??
      metaEnv?.VITE_GEMINI_API_KEY ??
      metaEnv?.API_KEY ??
      metaEnv?.VITE_API_KEY ??
      processEnv?.GEMINI_API_KEY ??
      processEnv?.API_KEY ??
      ''
    );
  }

  private getClient(): GoogleGenAI {
    if (this.ai) return this.ai;

    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error(
        "Missing API key. Set GEMINI_API_KEY in .env.local (or VITE_GEMINI_API_KEY for Vite-style env exposure)."
      );
    }

    this.ai = new GoogleGenAI({ apiKey });
    return this.ai;
  }

  createChat() {
    return this.getClient().chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `Tu es Aura, le concierge virtuel de 'Maison Aura', un salon de coiffure de luxe à Paris (1er Arrondissement).
        Ton ton est sophistiqué, chaleureux et professionnel. Tu es un expert en coiffure et en esthétique.
        
        Détails du Salon :
        - Services : Coupe Signature (95€), Balayage Lumière (à partir de 160€), Soin Tokyo (120€), Coloration Végétale (110€).
        - Horaires : Mardi - Samedi : 10h - 19h. Nocturne le Jeudi jusqu'à 21h.
        - Adresse : 12 Rue du Faubourg, Paris.
        - Contact : +33 1 40 20 30 40, bonjour@maisonaura.com.
        
        Ta mission :
        1. Conseiller les clients sur les services (ex: expliquer la différence entre balayage et coloration).
        2. Aider à la réservation (rediriger vers la page /booking ou mentionner le téléphone pour le sur-mesure).
        3. Donner des conseils capillaires brefs et élégants.
        
        Règles de conversation :
        - Sois concis mais poli.
        - Utilise un vouvoiement élégant.
        - Si on te demande des services que nous ne faisons pas (ex: ongles, massage corps), indique poliment que nous sommes spécialisés exclusivement dans la haute coiffure.
        `,
      }
    });
  }
}