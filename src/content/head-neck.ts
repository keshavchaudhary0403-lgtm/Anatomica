import type { Clinical } from './types';

export const HEAD_NECK: Record<string, Clinical> = {
  'Facial nerve (VII)': {
    clinical: [
      'Lower motor neuron lesion (Bell palsy): whole half of the face weak, including the forehead.',
      'Upper motor neuron lesion (stroke): forehead spared because it has bilateral cortical supply.',
      'At risk in parotid surgery: it divides into five branches inside the parotid gland.',
    ],
    neet: ['Branches in the face: temporal, zygomatic, buccal, marginal mandibular, cervical ("To Zanzibar By Motor Car").'],
  },
  'Trigeminal nerve (V)': {
    clinical: [
      'Trigeminal neuralgia: brief, severe electric-shock pain in V2 or V3, triggered by touch or chewing.',
      'Corneal reflex: afferent V1, efferent VII.',
    ],
    neet: ['Exits: V1 superior orbital fissure, V2 foramen rotundum, V3 foramen ovale ("Standing Room Only").'],
  },
  'Oculomotor nerve (III)': {
    clinical: [
      'Palsy: eye "down and out", ptosis; a dilated pupil suggests compression (posterior communicating aneurysm, uncal herniation).',
      'Diabetic third nerve palsy usually spares the pupil.',
    ],
    neet: ['Parasympathetic pupillary fibres run on the outside of the nerve, so compression affects them first.'],
  },
  'Abducens nerve (VI)': {
    clinical: ['Longest intracranial course, so it is often a false localising sign in raised intracranial pressure.'],
    neet: ['Supplies lateral rectus (LR6 SO4, rest 3).'],
  },
  'Trochlear nerve (IV)': {
    clinical: ['Palsy causes vertical diplopia worse looking down (reading, stairs); patient tilts the head away from the lesion.'],
    neet: ['Only cranial nerve to emerge from the back of the brainstem; thinnest cranial nerve.'],
  },
  'Hypoglossal nerve (XII)': {
    clinical: ['Lower motor neuron lesion: tongue deviates towards the side of the lesion on protrusion, with wasting and fasciculation.'],
    neet: ['At risk in carotid endarterectomy and submandibular gland surgery.'],
  },
  'Accessory nerve (XI)': {
    clinical: ['Injured in posterior triangle surgery: weak shoulder shrug and drooping shoulder.'],
    neet: ['Crosses the posterior triangle superficially, roughly at the junction of the upper and middle thirds of sternocleidomastoid.'],
  },
  'Glossopharyngeal nerve (IX)': {
    clinical: ['Afferent limb of the gag reflex (efferent: vagus).'],
    neet: ['Taste and general sensation from the posterior one-third of the tongue.'],
  },
  'Optic nerve (II)': {
    clinical: ['Papilloedema signals raised intracranial pressure.', 'Relative afferent pupillary defect (Marcus Gunn pupil) in optic neuritis.'],
    neet: ['Actually a tract of the CNS, covered by meninges, so it is affected in multiple sclerosis.'],
  },
  'Optic chiasm': {
    clinical: ['Pituitary adenoma compresses it from below: bitemporal hemianopia, starting in the upper quadrants.', 'Craniopharyngioma compresses from above: lower quadrants first.'],
    neet: ['Nasal fibres (temporal visual fields) cross at the chiasm.'],
  },
  'Internal carotid artery': {
    clinical: ['Stenosis causes TIAs and amaurosis fugax; endarterectomy for symptomatic stenosis of 70% or more.'],
    neet: ['Gives no branches in the neck.'],
  },
  'External carotid artery': {
    clinical: ['Can be ligated to control severe bleeding from the face or nose; collaterals keep the face perfused.'],
    neet: ['Branches: superior thyroid, ascending pharyngeal, lingual, facial, occipital, posterior auricular, maxillary, superficial temporal.'],
  },
  'Common carotid artery': {
    clinical: ['Pulse felt at the anterior border of sternocleidomastoid, level with the upper border of the thyroid cartilage; press one side only.'],
    neet: ['Bifurcates at the upper border of the thyroid cartilage (C3–C4); carotid sinus and body lie at the bifurcation.'],
  },
  'Middle cerebral artery (M1-segment)': {
    clinical: ['MCA stroke: contralateral weakness and sensory loss of face and arm more than leg; aphasia if the dominant side.'],
    neet: ['Anterior cerebral artery stroke affects the leg more than the arm.'],
  },
  'Vertebral artery': {
    clinical: ['Dissection after neck manipulation causes posterior circulation stroke.'],
    neet: ['Passes through the foramina transversaria of C6 to C1 and enters the skull through the foramen magnum.'],
  },
  'Basilar artery': {
    clinical: ['Occlusion can cause locked-in syndrome (ventral pons infarct): conscious, quadriplegic, only vertical eye movements.'],
    neet: ['Formed by the two vertebral arteries at the lower border of the pons.'],
  },
  'Superficial temporal artery': {
    clinical: ['Tender, thickened artery with headache and jaw claudication in the elderly suggests giant cell arteritis; treat with steroids urgently to protect vision.'],
    neet: ['Pulse felt in front of the tragus of the ear.'],
  },
  'Parotid gland': {
    supply: [{ label: 'Secretomotor', text: 'Glossopharyngeal nerve via the otic ganglion and auriculotemporal nerve' }],
    clinical: [
      'Pleomorphic adenoma is the most common parotid tumour.',
      'Frey syndrome after parotidectomy: gustatory sweating from misdirected regrowth of nerve fibres.',
    ],
    neet: ['Parotid duct (Stensen) opens opposite the upper second molar.'],
  },
  'Cricoid cartilage': {
    clinical: [
      'Only complete ring of cartilage in the airway; cricoid pressure was used during rapid sequence induction.',
      'Narrowest part of the airway in young children.',
    ],
    neet: ['Lies at the C6 vertebral level, where the larynx ends and the trachea begins.'],
  },
  'Median cricothyroid ligament': {
    clinical: ['Emergency surgical airway (cricothyroidotomy) goes through it when you cannot intubate and cannot oxygenate.'],
    neet: ['Felt as a soft dip between the thyroid and cricoid cartilages.'],
    procedure: 'Cricothyroidotomy',
  },
  Epiglottis: {
    clinical: [
      'Acute epiglottitis: drooling, stridor, tripod position; do not examine the throat, secure the airway.',
      'The laryngoscope blade tip sits in the vallecula in front of the epiglottis (Macintosh blade).',
    ],
    neet: ['Lateral neck X-ray shows the "thumb sign" in epiglottitis.'],
    procedure: 'Endotracheal intubation',
  },
  'External jugular vein': {
    clinical: ['Useful for emergency venous access; visible crossing sternocleidomastoid.', 'Can mislead JVP assessment; the internal jugular vein is preferred.'],
    neet: ['Formed behind the angle of the mandible by the posterior auricular vein and posterior division of the retromandibular vein.'],
    procedure: 'External jugular cannulation',
  },
  Mandible: {
    clinical: ['Often fractures in two places (ring principle).', 'Dislocated anteriorly by yawning; reduced by pressing down and back on the molars.'],
    neet: ['Commonest site of fracture is the condylar neck.'],
  },
  Thalamus: {
    clinical: ['Thalamic stroke causes contralateral sensory loss and sometimes severe central pain (Dejerine–Roussy syndrome).'],
    neet: ['Relay station for all sensations except smell.'],
  },
  Hippocampus: {
    clinical: ['Damaged early in Alzheimer disease and in hypoxic brain injury; mesial temporal sclerosis causes temporal lobe epilepsy.'],
    neet: ['Essential for forming new long-term memories.'],
  },
  'Tonsil of cerebellum': {
    clinical: [
      'Tonsillar herniation (coning) through the foramen magnum compresses the medulla: respiratory arrest.',
      'Never do a lumbar puncture when raised intracranial pressure is suspected without imaging first.',
    ],
    neet: ['Arnold–Chiari malformation involves downward displacement of the tonsils.'],
  },
  'Medulla oblongata': {
    clinical: ['Lateral medullary (Wallenberg) syndrome from PICA or vertebral artery occlusion: ipsilateral face and contralateral body pain and temperature loss.'],
    neet: ['Contains the cardiac, respiratory and vasomotor centres.'],
  },
  Pons: {
    clinical: ['Pontine haemorrhage: pinpoint pupils and coma.'],
    neet: ['Nuclei of cranial nerves V, VI, VII and VIII lie in the pons.'],
  },
  Midbrain: {
    clinical: ['Weber syndrome: ipsilateral third nerve palsy with contralateral hemiplegia.'],
    neet: ['Nuclei of cranial nerves III and IV.'],
  },
  'Corpus callosum': {
    clinical: ['Agenesis may be found incidentally; callosotomy is a treatment for drop attacks in severe epilepsy.'],
    neet: ['Largest commissure of the brain, joining the two hemispheres.'],
  },
};
