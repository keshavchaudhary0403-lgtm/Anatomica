import type { Clinical } from './types';

export const THORAX: Record<string, Clinical> = {
  'Manubrium of sternum': {
    clinical: [
      'Sternal angle (of Louis) at the manubriosternal joint is level with the 2nd costal cartilage: start counting ribs here.',
      'Bone marrow aspiration can be done from the sternum in adults.',
    ],
    neet: [
      'The sternal angle lies at the T4–T5 disc level: arch of aorta begins and ends, trachea bifurcates, azygos joins the SVC.',
    ],
  },
  'First rib': {
    clinical: [
      'Fracture indicates high-energy trauma; look for subclavian vessel and brachial plexus injury.',
      'A cervical rib or tight scalene can compress the subclavian artery and lower trunk (thoracic outlet syndrome).',
    ],
    neet: ['Scalene tubercle separates the groove for the subclavian vein (in front) from the subclavian artery (behind).'],
  },
  'Intercostal nerves': {
    clinical: [
      'Neurovascular bundle runs in the costal groove at the lower border of each rib, in the order vein, artery, nerve (VAN) from above down.',
      'So needles for pleural tap and chest drains go just above the upper border of the rib below.',
      'Herpes zoster follows a dermatome supplied by an intercostal nerve.',
    ],
    neet: ['Intercostal nerve block is given at the angle of the rib, posterior to the lateral cutaneous branch.'],
    procedure: 'Intercostal drain and pleural tap',
  },
  'Posterior intercostal arteries': {
    clinical: ['Damage during chest drain insertion causes haemothorax; stay close to the upper border of the rib below.'],
    neet: ['First two come from the superior intercostal artery (costocervical trunk); the rest from the thoracic aorta.'],
  },
  'Internal thoracic artery': {
    clinical: [
      'Lies about 1 cm lateral to the sternal edge; avoid it during pericardiocentesis and parasternal procedures.',
      'Preferred graft (LIMA to LAD) in coronary artery bypass surgery.',
    ],
    neet: ['Divides in the 6th intercostal space into the musculophrenic and superior epigastric arteries.'],
  },
  Pleura: {
    clinical: [
      'Pneumothorax: tension pneumothorax needs immediate needle decompression.',
      'Pleural effusion is tapped in the mid-axillary line below the level of dullness.',
      'Pleura extends above the clavicle (cervical pleura) and can be punctured during subclavian or IJV lines.',
    ],
    neet: [
      'Pleural reflections (lines 8–10–12): crosses rib 8 at the mid-clavicular line, rib 10 at the mid-axillary line, rib 12 at the paravertebral line.',
      'Parietal pleura is pain-sensitive (intercostal and phrenic nerves); visceral pleura is not.',
    ],
    imaging: 'Erect chest X-ray: blunted costophrenic angle with about 200 ml or more of fluid.',
    procedure: 'Pleural tap and intercostal drain',
  },
  Lungs: {
    clinical: [
      'Aspirated foreign bodies most often enter the right lower lobe because the right main bronchus is wider, shorter and more vertical.',
      'Lying supine, aspiration goes to the posterior segment of the right upper lobe or the superior segment of the lower lobe.',
    ],
    neet: ['Right lung has 3 lobes and 10 segments; left lung has 2 lobes and usually 8–10 segments with a lingula.'],
    imaging: 'Silhouette sign: loss of the right heart border means middle lobe disease; loss of the left heart border means lingula.',
  },
  Diaphragm: {
    supply: [{ label: 'Nerve', text: 'Phrenic nerve (C3–C5), motor and central sensory' }],
    clinical: [
      'Diaphragmatic irritation refers pain to the shoulder tip (C4 dermatome).',
      'Congenital diaphragmatic hernia is usually posterolateral through the Bochdalek foramen, on the left.',
    ],
    neet: [
      'Openings: IVC at T8, oesophagus at T10, aorta at T12 ("I 8 10 Eggs At 12").',
      '"C3, 4, 5 keeps the diaphragm alive."',
    ],
    imaging: 'Free gas under the diaphragm on an erect chest X-ray means a perforated viscus.',
  },
  'Right coronary artery': {
    clinical: [
      'Occlusion gives inferior wall MI (leads II, III, aVF), often with bradycardia or heart block.',
      'Supplies the SA node in about 60% and the AV node in about 80–90% of people.',
    ],
    neet: ['Right dominance (posterior descending artery from the RCA) is seen in most people.'],
  },
  'Superior vena cava': {
    clinical: [
      'SVC obstruction (usually lung cancer or lymphoma): facial swelling, dilated neck and chest veins, worse on lying down.',
      'Tip of a central line should sit at the junction of the SVC and right atrium.',
    ],
    neet: ['Formed by the two brachiocephalic veins behind the 1st right costal cartilage; receives the azygos vein.'],
    imaging: 'On a chest X-ray the carina is a practical landmark for central line tip position.',
  },
  'Thoracic aorta': {
    clinical: [
      'Aortic dissection: tearing chest pain radiating to the back, unequal arm pulses or BP.',
      'Coarctation (usually just after the left subclavian) causes radio-femoral delay and rib notching.',
    ],
    neet: ['Rib notching in coarctation affects ribs 3–8 because of enlarged posterior intercostal collaterals.'],
    imaging: 'Widened mediastinum on chest X-ray after trauma suggests aortic injury.',
  },
  Trachea: {
    clinical: [
      'Deviated away from a tension pneumothorax or large effusion; pulled towards collapse or fibrosis.',
      'Tracheostomy is done through the 2nd to 4th tracheal rings, below the isthmus of the thyroid or after dividing it.',
    ],
    neet: ['Bifurcates at the sternal angle (T4–T5) in the cadaver, slightly lower in the living in inspiration.'],
    procedure: 'Endotracheal intubation and tracheostomy',
  },
  Oesophagus: {
    clinical: [
      'Constrictions at 15, 25 and 40 cm from the incisors are where foreign bodies lodge and strictures form.',
      'Ryle tube measurement: nose to ear lobe to xiphisternum.',
      'Left atrial enlargement can indent the oesophagus (dysphagia megalatriensis).',
    ],
    neet: ['Constrictions: pharyngo-oesophageal junction, aortic arch / left main bronchus crossing, diaphragm.'],
    procedure: 'Ryle tube (nasogastric) insertion',
  },
  'Vagus nerve (X)': {
    clinical: [
      'The left recurrent laryngeal nerve hooks under the aortic arch, so it is involved in aortic aneurysm and left lung cancer (hoarseness).',
      'Uvula deviates away from the side of a vagus lesion.',
    ],
    neet: ['Right recurrent laryngeal nerve hooks under the right subclavian artery.'],
  },
  'Pulmonary trunk': {
    clinical: ['Saddle pulmonary embolus lodges at its bifurcation.'],
    neet: ['Connected to the aortic arch by the ligamentum arteriosum (remnant of the ductus arteriosus).'],
  },
  'Left ventricle': {
    clinical: [
      'Apex beat is normally in the left 5th intercostal space in the mid-clavicular line; displaced in LV enlargement.',
      'Thickened in hypertension and aortic stenosis.',
    ],
    neet: ['Forms the apex and most of the left border and diaphragmatic surface of the heart.'],
  },
  'Right ventricle': {
    clinical: [
      'Most anterior chamber, so it is the one most often injured in penetrating chest trauma.',
      'Pericardiocentesis needle enters below the xiphoid, aimed at the left shoulder.',
    ],
    neet: ['Forms most of the anterior (sternocostal) surface; the moderator band carries the right bundle branch.'],
  },
  'Left atrium': {
    clinical: ['Enlargement in mitral stenosis can press on the oesophagus and the left recurrent laryngeal nerve (Ortner syndrome).'],
    neet: ['Most posterior chamber of the heart; best seen on transoesophageal echocardiography.'],
  },
  'Azygos vein': {
    clinical: ['Connects the SVC and IVC systems; an important collateral in IVC obstruction.'],
    neet: ['Arches over the root of the right lung to join the SVC at the T4 level.'],
  },
  'Sympathetic trunk': {
    clinical: ['Damage to the cervical part (or T1 by a Pancoast tumour) causes Horner syndrome: ptosis, miosis, anhidrosis.'],
    neet: ['Stellate ganglion = inferior cervical + first thoracic ganglion; a block treats complex regional pain in the arm.'],
  },
};
