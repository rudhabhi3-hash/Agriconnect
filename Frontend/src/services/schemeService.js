import { detectIntents, extractProblemDetails, findPotentialSchemes, normalizeText } from '../utils/schemeMatcher.js';
export function normalizeFarmerProblem(input) { return normalizeText(input); }
export function detectProblemIntents(input) { return detectIntents(normalizeText(input)); }
export function extractFarmerContext(input) { return extractProblemDetails(input); }
export function matchSchemes(analysis) { return findPotentialSchemes(analysis); }
export function getMissingInformation(analysis) { return analysis.missingInformation || []; }
export function getMissingFarmerDetails(details) { return ['fullName', 'mobile', 'district', 'village', 'cultivatedArea', 'lossDate', 'insured'].filter(field => !details[field]); }
export function generateSchemeExplanation(scheme, analysis) { return scheme.reason || `Potentially relevant based on ${analysis.intents.join(', ')}.`; }
export function analyzeFarmerProblem(input) { const analysis = extractFarmerContext(input); const matches = matchSchemes(analysis); return { ...analysis, matches, status: matches.length ? 'matched' : 'needs_more_information' }; }
export function generateApplicationDraft(details, scheme) { return { scheme: scheme.name, applicant: details.fullName || 'Farmer Name', state: details.state || details.location || 'Not specified', district: details.district || 'Not specified', crop: details.crop || 'Not specified', affectedArea: details.affectedArea || 'Not specified', cause: details.cause || 'Not specified', lossDate: details.lossDate || 'Not specified', officialUrl: scheme.officialUrl }; }
