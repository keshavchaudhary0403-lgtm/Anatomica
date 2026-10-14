import type { SystemId } from '../data';

// A structure by name, optionally a side ("right" = the patient's right).
export interface Ref { n: string; s?: 'right' | 'left' }
export type Role = 'target' | 'landmark' | 'risk';
export interface Procedure {
  id: string;
  title: string;
  summary: string;
  /** Layers shown in full; other structures appear only if they have a role. */
  context: SystemId[];
  /** Which way the camera looks from: the side of the patient you stand on. */
  view: 'front' | 'back' | 'right' | 'left' | 'front-right' | 'back-right';
  /** faint: drawn as a light tint (for large sheets like the pleura). */
  roles: { ref: Ref; role: Role; faint?: boolean }[];
  steps: { title: string; text: string; focus?: Ref }[];
  mistakes: string[];
}

const R = (n: string): Ref => ({ n, s: 'right' });
const N = (n: string): Ref => ({ n });

export const PROCEDURES: Procedure[] = [
  {
    id: 'iv-cannulation',
    title: 'Peripheral IV cannulation',
    summary: 'Choose a straight, palpable vein, starting distally.',
    context: ['skeleton'],
    view: 'front-right',
    roles: [
      { ref: R('Dorsal venous network of hand'), role: 'target' },
      { ref: R('Cephalic vein'), role: 'target' },
      { ref: R('Median cubital vein'), role: 'target' },
      { ref: R('Basilic vein'), role: 'landmark' },
      { ref: R('Brachial artery'), role: 'risk' },
      { ref: R('Median nerve'), role: 'risk' },
      { ref: R('Superficial branch of radial nerve'), role: 'risk' },
    ],
    steps: [
      { title: 'Pick the site', text: 'Start with the dorsal venous network of the hand or the forearm, then move proximally. Avoid joints if the line must stay in for long.', focus: R('Dorsal venous network of hand') },
      { title: 'Tourniquet and palpate', text: 'Apply the tourniquet 7–10 cm above the site. A good vein feels soft and bouncy and refills when pressed.', focus: R('Cephalic vein') },
      { title: 'Insert', text: 'Anchor the vein by stretching the skin. Bevel up, enter at 10–30°. Watch for flashback, advance 2 mm more, then slide the cannula off the needle.', focus: R('Cephalic vein') },
      { title: 'Antecubital fossa', text: 'The median cubital vein is easy to find, but the brachial artery and median nerve lie deeper and medial, under the bicipital aponeurosis.', focus: R('Median cubital vein') },
      { title: 'Secure and flush', text: 'Release the tourniquet before removing the needle. Flush with saline; stop if there is swelling or pain.' },
    ],
    mistakes: [
      'Cannulating the cephalic vein near the wrist and injuring the superficial radial nerve (numb dorsum of thumb).',
      'Going too deep at the elbow and hitting the brachial artery: bright red, pulsatile flashback.',
      'Leaving the tourniquet on while flushing.',
    ],
  },
  {
    id: 'abg',
    title: 'Arterial blood gas (radial)',
    summary: 'Radial artery, lateral to the flexor carpi radialis tendon, after a modified Allen test.',
    context: ['skeleton'],
    view: 'front-right',
    roles: [
      { ref: R('Radial artery'), role: 'target' },
      { ref: R('Flexor carpi radialis'), role: 'landmark' },
      { ref: R('Radius'), role: 'landmark' },
      { ref: R('Ulnar artery'), role: 'landmark' },
      { ref: R('Median nerve'), role: 'risk' },
      { ref: R('Superficial branch of radial nerve'), role: 'risk' },
    ],
    steps: [
      { title: 'Modified Allen test', text: 'Compress both arteries, ask the patient to clench and open the fist, then release the ulnar artery. Colour should return within 5–15 seconds.', focus: R('Ulnar artery') },
      { title: 'Position', text: 'Extend the wrist about 30° over a rolled towel. Feel the pulse 2–3 cm proximal to the wrist crease, lateral to the flexor carpi radialis tendon.', focus: R('Flexor carpi radialis') },
      { title: 'Puncture', text: 'Bevel up, 30–45° against the flow of blood, aiming at the pulse. Arterial pressure fills the syringe.', focus: R('Radial artery') },
      { title: 'After', text: 'Press firmly for at least 5 minutes (longer if anticoagulated). Expel air bubbles and send on ice if delayed.' },
    ],
    mistakes: [
      'Going medial to the flexor carpi radialis tendon, towards the median nerve.',
      'Not pressing long enough, causing a haematoma.',
      'Skipping the Allen test.',
    ],
  },
  {
    id: 'lumbar-puncture',
    title: 'Lumbar puncture',
    summary: 'L3–L4 or L4–L5 interspace, found with the line joining the iliac crests.',
    context: ['skeleton'],
    view: 'back',
    roles: [
      { ref: N('Interspinous ligaments'), role: 'target' },
      { ref: N('Supraspinous ligament'), role: 'target' },
      { ref: N('Spinal dura'), role: 'target' },
      { ref: N('Vertebra L3'), role: 'landmark' },
      { ref: N('Vertebra L4'), role: 'landmark' },
      { ref: R('Hip bone'), role: 'landmark' },
      { ref: N('Cauda equina'), role: 'risk' },
    ],
    steps: [
      { title: 'Check first', text: 'Exclude raised intracranial pressure (focal signs, papilloedema, reduced consciousness: image first), coagulopathy and local infection.' },
      { title: 'Position', text: 'Lateral position, knees to chest, back at the edge of the bed and perpendicular to it; or sitting, leaning forward.', focus: N('Vertebra L4') },
      { title: 'Find the level', text: 'The line joining the tops of the iliac crests (Tuffier line) crosses the L4 spine. Use the space above or below it.', focus: R('Hip bone') },
      { title: 'Insert', text: 'Midline, between the spines, aiming slightly towards the umbilicus. Needle passes the supraspinous and interspinous ligaments, then the ligamentum flavum.', focus: N('Supraspinous ligament') },
      { title: 'Enter the CSF', text: 'A second "pop" as the needle passes the dura. Remove the stylet and watch for CSF; measure opening pressure before collecting samples.', focus: N('Spinal dura') },
    ],
    mistakes: [
      'Going above L2 in an adult, where the cord may still lie.',
      'Doing LP before a CT when intracranial pressure may be raised (risk of coning).',
      'Patient rotated or not flexed, so the needle hits bone.',
    ],
  },
  {
    id: 'chest-drain',
    title: 'Intercostal chest drain',
    summary: 'Triangle of safety, 5th intercostal space, mid-axillary line, just above the rib below.',
    context: ['skeleton'],
    view: 'right',
    roles: [
      { ref: N('Pleura'), role: 'target', faint: true },
      { ref: R('Fifth rib'), role: 'landmark' },
      { ref: R('Sixth rib'), role: 'landmark' },
      { ref: R('Latissimus dorsi muscle'), role: 'landmark', faint: true },
      { ref: R('Sternocostal head of pectoralis major muscle'), role: 'landmark', faint: true },
      { ref: R('Intercostal nerves'), role: 'risk' },
      { ref: R('Posterior intercostal arteries'), role: 'risk' },
      { ref: R('Long thoracic nerve'), role: 'risk' },
    ],
    steps: [
      { title: 'Triangle of safety', text: 'Bounded by the lateral border of pectoralis major, the anterior border of latissimus dorsi, and a line at the level of the nipple (5th intercostal space); apex below the axilla.', focus: R('Latissimus dorsi muscle') },
      { title: 'Find the space', text: 'Count from the sternal angle (2nd rib). Insert in the 5th intercostal space, mid-axillary line.', focus: R('Fifth rib') },
      { title: 'Stay above the rib', text: 'The vein, artery and nerve run in the groove at the lower border of each rib. Dissect bluntly over the upper border of the 6th rib.', focus: R('Sixth rib') },
      { title: 'Enter the pleura', text: 'Puncture the parietal pleura with blunt forceps, sweep a finger to feel for adhesions, then insert the tube.', focus: N('Pleura') },
      { title: 'Connect and check', text: 'Connect to an underwater seal; it should swing with breathing. Confirm the position on chest X-ray.' },
    ],
    mistakes: [
      'Going below the 5th space and entering the liver or spleen.',
      'Inserting near the lower border of a rib and cutting the intercostal vessels.',
      'Going too posterior and injuring the long thoracic nerve.',
    ],
  },
  {
    id: 'pleural-tap',
    title: 'Pleural tap (thoracocentesis)',
    summary: 'Posteriorly, one or two spaces below the top of the dullness, above the rib.',
    context: ['skeleton'],
    view: 'back-right',
    roles: [
      { ref: N('Pleura'), role: 'target', faint: true },
      { ref: R('Ninth rib'), role: 'landmark' },
      { ref: R('Scapula'), role: 'landmark' },
      { ref: R('Intercostal nerves'), role: 'risk' },
      { ref: R('Posterior intercostal arteries'), role: 'risk' },
    ],
    steps: [
      { title: 'Position', text: 'Patient sitting, leaning forward over a table. Confirm the fluid level by percussion and ideally ultrasound.' },
      { title: 'Choose the space', text: 'Usually 1–2 spaces below the upper level of dullness, between the posterior axillary line and the scapular line; not below the 9th rib.', focus: R('Ninth rib') },
      { title: 'Insert', text: 'Just above the upper border of the rib below, to avoid the neurovascular bundle.', focus: R('Posterior intercostal arteries') },
      { title: 'Aspirate', text: 'Do not remove more than 1–1.5 litres at one time (risk of re-expansion pulmonary oedema).' },
    ],
    mistakes: ['Going too low and hitting the diaphragm, liver or spleen.', 'Removing too much fluid too fast.'],
  },
  {
    id: 'foley',
    title: 'Foley catheterisation (male)',
    summary: 'Lift the penis to straighten the urethra; balloon only after urine flows.',
    context: ['skeleton'],
    view: 'front-right',
    roles: [
      { ref: N('Urethra'), role: 'target' },
      { ref: N('Urinary bladder'), role: 'target' },
      { ref: N('Prostate'), role: 'landmark' },
    ],
    steps: [
      { title: 'Prepare', text: 'Aseptic technique. Instil lidocaine gel into the urethra and wait 3–5 minutes.' },
      { title: 'Straighten the urethra', text: 'Hold the penis upright, perpendicular to the body, to remove the bend in the penile urethra.', focus: N('Urethra') },
      { title: 'Pass the prostate', text: 'Resistance at the membranous urethra and prostate is common; lowering the penis towards the feet helps it pass.', focus: N('Prostate') },
      { title: 'Confirm, then inflate', text: 'Advance to the hilt; inflate the balloon only once urine drains, so it is in the bladder, not the urethra.', focus: N('Urinary bladder') },
      { title: 'Replace the foreskin', text: 'Always pull the foreskin back over the glans to prevent paraphimosis.' },
    ],
    mistakes: [
      'Inflating the balloon in the prostatic urethra: severe pain, bleeding, false passage.',
      'Catheterising after pelvic trauma with blood at the meatus: get a retrograde urethrogram first.',
      'Forgetting to replace the foreskin.',
    ],
  },
  {
    id: 'ijv-line',
    title: 'Central line: internal jugular vein',
    summary: 'Right IJV at the apex of the sternocleidomastoid triangle, ultrasound-guided.',
    context: ['skeleton'],
    view: 'front-right',
    roles: [
      { ref: R('Internal jugular vein'), role: 'target' },
      { ref: R('Sternocleidomastoid muscle'), role: 'landmark', faint: true },
      { ref: R('Clavicle'), role: 'landmark' },
      { ref: N('Right common carotid artery'), role: 'risk' },
      { ref: R('Vagus nerve (X)'), role: 'risk' },
    ],
    steps: [
      { title: 'Position', text: 'Head down (Trendelenburg) to fill the vein and reduce air embolism risk; head turned slightly to the left.' },
      { title: 'Landmarks', text: 'Triangle formed by the sternal and clavicular heads of sternocleidomastoid and the clavicle. The vein lies at the apex, lateral to the carotid pulse.', focus: R('Sternocleidomastoid muscle') },
      { title: 'Ultrasound', text: 'The vein is compressible and larger; the carotid is round, pulsatile and medial. Keep the needle tip in view.', focus: R('Internal jugular vein') },
      { title: 'Insert', text: 'At 30–45°, aiming at the ipsilateral nipple, aspirating as you go. Thread the guidewire (Seldinger), watching the ECG for arrhythmias.', focus: R('Internal jugular vein') },
      { title: 'Confirm', text: 'Chest X-ray: tip at the junction of the SVC and right atrium, and no pneumothorax.' },
    ],
    mistakes: [
      'Aiming medially and puncturing the carotid artery.',
      'Going too low and deep: pneumothorax from the cervical pleura.',
      'Leaving the hub open to air.',
    ],
  },
  {
    id: 'femoral-access',
    title: 'Femoral venous access',
    summary: 'Medial to the femoral pulse, 1–2 cm below the inguinal ligament (NAVEL).',
    context: ['skeleton'],
    view: 'front-right',
    roles: [
      { ref: R('Femoral vein'), role: 'target' },
      { ref: R('Inguinal ligament'), role: 'landmark' },
      { ref: R('Femoral artery'), role: 'risk' },
      { ref: R('Femoral nerve'), role: 'risk' },
    ],
    steps: [
      { title: 'Landmarks', text: 'Find the inguinal ligament from the anterior superior iliac spine to the pubic tubercle. The femoral pulse is at the mid-inguinal point.', focus: R('Inguinal ligament') },
      { title: 'Order', text: 'Lateral to medial: nerve, artery, vein, empty space, lymphatics (NAVEL).', focus: R('Femoral artery') },
      { title: 'Insert', text: 'About 1 cm medial to the pulse and 1–2 cm below the ligament, aiming towards the head at 45°.', focus: R('Femoral vein') },
    ],
    mistakes: [
      'Puncturing above the inguinal ligament: bleeding into the retroperitoneum that cannot be compressed.',
      'Too lateral: femoral nerve or artery injury.',
    ],
  },
  {
    id: 'gluteal-im',
    title: 'Gluteal IM injection',
    summary: 'Upper outer quadrant of the buttock or the ventrogluteal site, away from the sciatic nerve.',
    context: ['skeleton'],
    view: 'back-right',
    roles: [
      { ref: R('Gluteus medius muscle'), role: 'target' },
      { ref: R('Hip bone'), role: 'landmark' },
      { ref: R('Femur'), role: 'landmark' },
      { ref: R('Sciatic nerve'), role: 'risk' },
      { ref: R('Superior gluteal nerve'), role: 'risk' },
    ],
    steps: [
      { title: 'Ventrogluteal site (preferred)', text: 'Heel of the hand on the greater trochanter, index finger on the anterior superior iliac spine, middle finger spread along the iliac crest. Inject in the V between the fingers into gluteus medius.', focus: R('Gluteus medius muscle') },
      { title: 'Dorsogluteal site', text: 'Divide the buttock into quadrants; inject into the upper outer quadrant only.', focus: R('Hip bone') },
      { title: 'Avoid', text: 'The sciatic nerve runs through the lower inner part of the buttock.', focus: R('Sciatic nerve') },
    ],
    mistakes: ['Injecting into the lower or inner quadrant and hitting the sciatic nerve.', 'Using too short a needle in obese patients (injection into fat).'],
  },
  {
    id: 'deltoid-im',
    title: 'Deltoid IM injection',
    summary: 'Upper deltoid, 2.5–5 cm below the acromion, in the middle of the muscle.',
    context: ['skeleton'],
    view: 'right',
    roles: [
      { ref: R('Acromial part of deltoid muscle'), role: 'target' },
      { ref: R('Scapula'), role: 'landmark' },
      { ref: R('Humerus'), role: 'landmark' },
      { ref: R('Axillary nerve'), role: 'risk' },
      { ref: R('Radial nerve'), role: 'risk' },
    ],
    steps: [
      { title: 'Find the site', text: 'Feel the lower edge of the acromion. Inject 2.5–5 cm below it, in the centre of the muscle.', focus: R('Acromial part of deltoid muscle') },
      { title: 'Avoid', text: 'The axillary nerve winds round the surgical neck about 5–6 cm below the acromion; the radial nerve is lower in the spiral groove.', focus: R('Axillary nerve') },
    ],
    mistakes: ['Injecting too low and hitting the axillary or radial nerve.', 'Injecting too high into the subacromial bursa (shoulder pain).'],
  },
  {
    id: 'ascitic-tap',
    title: 'Ascitic tap (paracentesis)',
    summary: 'Left iliac fossa, lateral to the rectus sheath, to avoid the inferior epigastric artery.',
    context: ['skeleton'],
    view: 'front',
    roles: [
      { ref: { n: 'Rectus abdominis muscle', s: 'left' }, role: 'landmark', faint: true },
      { ref: { n: 'Hip bone', s: 'left' }, role: 'landmark' },
      { ref: { n: 'Inferior epigastric artery', s: 'left' }, role: 'risk' },
      { ref: N('Urinary bladder'), role: 'risk' },
      { ref: N('Descending colon'), role: 'target' },
    ],
    steps: [
      { title: 'Empty the bladder', text: 'Ask the patient to pass urine, or check the bladder is empty on ultrasound.', focus: N('Urinary bladder') },
      { title: 'Find the site', text: 'Two finger-breadths (about 3–5 cm) medial and superior to the anterior superior iliac spine, usually on the left. Ultrasound shows the fluid pocket.', focus: { n: 'Hip bone', s: 'left' } },
      { title: 'Stay lateral', text: 'The inferior epigastric artery runs up behind the rectus abdominis; stay lateral to the edge of the rectus sheath.', focus: { n: 'Inferior epigastric artery', s: 'left' } },
      { title: 'Insert', text: 'Use a Z-track (pull the skin down before inserting) to reduce leakage afterwards.' },
    ],
    mistakes: ['Going through the rectus muscle and hitting the inferior epigastric artery.', 'Tapping with a full bladder.'],
  },
  {
    id: 'ryles-tube',
    title: 'Ryle tube (nasogastric tube)',
    summary: 'Measure nose–ear–xiphisternum; pass along the floor of the nose; confirm with pH or X-ray.',
    context: ['skeleton'],
    view: 'right',
    roles: [
      { ref: N('Oesophagus'), role: 'target' },
      { ref: N('Stomach'), role: 'target' },
      { ref: N('Nasopharynx'), role: 'landmark' },
      { ref: N('Oropharynx'), role: 'landmark' },
      { ref: N('Laryngopharynx'), role: 'landmark' },
      { ref: N('Trachea'), role: 'risk' },
    ],
    steps: [
      { title: 'Measure', text: 'From the tip of the nose to the ear lobe, then down to the xiphisternum. Mark this length on the tube.' },
      { title: 'Into the nose', text: 'Lubricate and pass straight backwards along the floor of the nose, not upwards.', focus: N('Nasopharynx') },
      { title: 'Swallow', text: 'When the tube reaches the pharynx, ask the patient to swallow sips of water; this closes the larynx and opens the oesophagus.', focus: N('Laryngopharynx') },
      { title: 'Confirm', text: 'Aspirate and check pH 5.5 or below; if unsure, chest X-ray. Do not rely on the "whoosh" test.', focus: N('Stomach') },
    ],
    mistakes: ['Passing upwards into the nose instead of backwards.', 'Entering the trachea: coughing, change in voice, desaturation.', 'Using the air "whoosh" test to confirm position.'],
  },
  {
    id: 'intubation',
    title: 'Endotracheal intubation',
    summary: 'Sniffing position; Macintosh blade in the vallecula; tube through the vocal cords.',
    context: ['skeleton'],
    view: 'right',
    roles: [
      { ref: N('Trachea'), role: 'target' },
      { ref: N('Epiglottis'), role: 'landmark' },
      { ref: N('Thyroid cartilage'), role: 'landmark' },
      { ref: N('Cricoid cartilage'), role: 'landmark' },
      { ref: R('Arytenoid cartilage'), role: 'landmark' },
      { ref: N('Oesophagus'), role: 'risk' },
    ],
    steps: [
      { title: 'Position', text: 'Sniffing the morning air: neck flexed, head extended. Preoxygenate for 3 minutes.' },
      { title: 'Laryngoscope', text: 'Blade in from the right, sweep the tongue left, tip in the vallecula in front of the epiglottis. Lift along the handle, do not lever on the teeth.', focus: N('Epiglottis') },
      { title: 'See the cords', text: 'The glottis lies in front of the arytenoids. External laryngeal pressure on the thyroid cartilage (BURP) improves the view.', focus: R('Arytenoid cartilage') },
      { title: 'Pass the tube', text: 'Tube through the cords until the cuff is just past them (about 21 cm at the teeth in women, 23 cm in men).', focus: N('Trachea') },
      { title: 'Confirm', text: 'End-tidal CO2 waveform is the gold standard; listen to both sides of the chest and the epigastrium.' },
    ],
    mistakes: ['Oesophageal intubation not recognised: always use capnography.', 'Tube too deep into the right main bronchus.', 'Levering on the upper teeth.'],
  },
  {
    id: 'cricothyroidotomy',
    title: 'Cricothyroidotomy',
    summary: 'Emergency airway through the cricothyroid membrane when you cannot intubate or oxygenate.',
    context: ['skeleton'],
    view: 'front',
    roles: [
      { ref: N('Median cricothyroid ligament'), role: 'target' },
      { ref: N('Thyroid cartilage'), role: 'landmark' },
      { ref: N('Cricoid cartilage'), role: 'landmark' },
      { ref: N('Thyroid gland'), role: 'risk' },
      { ref: R('Anterior jugular vein'), role: 'risk' },
    ],
    steps: [
      { title: 'Find the membrane', text: 'Slide a finger down from the thyroid notch to the soft dip just above the cricoid ring ("laryngeal handshake").', focus: N('Median cricothyroid ligament') },
      { title: 'Scalpel-bougie-tube', text: 'Stab incision through the membrane, rotate the blade 90°, slide a bougie in, then a 6.0 cuffed tube over it.', focus: N('Cricoid cartilage') },
    ],
    mistakes: ['Going too low through the thyroid isthmus, which bleeds.', 'Delaying the decision while oxygen saturation falls.'],
  },
];
