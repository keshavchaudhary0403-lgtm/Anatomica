import type { Clinical } from './types';

export const CORE: Record<string, Clinical> = {
  Humerus: {
    supply: [
      { label: 'Nutrient artery', text: 'Branch of the profunda brachii / brachial artery' },
    ],
    clinical: [
      'Surgical neck fracture risks the axillary nerve and posterior circumflex humeral artery.',
      'Mid-shaft (spiral groove) fracture risks the radial nerve and profunda brachii artery: wrist drop.',
      'Supracondylar fracture (children) risks the brachial artery and median nerve; watch for Volkmann ischaemic contracture.',
      'Medial epicondyle fracture risks the ulnar nerve.',
    ],
    neet: [
      'Anatomical neck = attachment of capsule; surgical neck = common fracture site.',
      'Most common nerve injured in humerus shaft fracture: radial nerve.',
    ],
    imaging: 'Supracondylar fracture on lateral X-ray: posterior fat pad sign and disrupted anterior humeral line.',
  },
  Clavicle: {
    clinical: [
      'Most commonly fractured bone in the body; usual site is the junction of medial two-thirds and lateral one-third.',
      'Medial fragment pulled up by sternocleidomastoid; lateral fragment pulled down by the weight of the limb.',
      'Rarely injures the subclavian vessels or brachial plexus.',
    ],
    neet: [
      'First bone to ossify (5th–6th week), membranous ossification of most of the shaft.',
      'Only long bone that lies horizontally and has no medullary cavity.',
    ],
  },
  'Radial nerve': {
    supply: [{ label: 'Roots', text: 'C5–T1 (posterior cord of brachial plexus)' }],
    clinical: [
      'Axilla (crutch palsy): wrist drop plus loss of elbow extension (triceps).',
      'Spiral groove (fracture, "Saturday night palsy"): wrist drop, triceps largely spared.',
      'Posterior interosseous nerve lesion: finger drop without wrist drop, no sensory loss.',
    ],
    neet: [
      'Sensory loss over the first dorsal web space is the classic test.',
      'Supplies all extensors of the arm and forearm; brachioradialis is a flexor supplied by radial nerve.',
    ],
  },
  'Median nerve': {
    supply: [{ label: 'Roots', text: 'C5–T1 (lateral and medial cords)' }],
    clinical: [
      'Carpal tunnel syndrome: thenar wasting, paraesthesia of lateral three and a half fingers, positive Phalen and Tinel tests.',
      'Lesion above the elbow: hand of benediction on attempting a fist, ape thumb deformity.',
      'Anterior interosseous nerve lesion: cannot make the "OK" sign (FPL and FDP index).',
    ],
    neet: [
      'Called the "labourer\'s nerve" / "eye of the hand".',
      'Recurrent (motor) branch supplies thenar muscles: APB, FPB, opponens pollicis (LOAF with lateral two lumbricals).',
    ],
  },
  'Ulnar nerve': {
    supply: [{ label: 'Roots', text: 'C8–T1 (medial cord)' }],
    clinical: [
      'Lesion at the wrist: claw hand of ring and little fingers (ulnar claw), more marked than at the elbow (ulnar paradox).',
      'Card test and Froment sign test adductor pollicis and interossei.',
      'Cubitus valgus after lateral condyle fracture can cause tardy ulnar nerve palsy.',
    ],
    neet: [
      '"Musician\'s nerve"; supplies most intrinsic hand muscles.',
      'Passes behind the medial epicondyle (funny bone) and through Guyon canal at the wrist.',
    ],
  },
  'Axillary nerve': {
    supply: [{ label: 'Roots', text: 'C5–C6 (posterior cord)' }],
    clinical: [
      'Injured in anterior shoulder dislocation and surgical neck fracture of humerus.',
      'Deltoid paralysis: loss of abduction from 15° to 90°, flattened shoulder contour.',
      'Sensory loss over the regimental badge area.',
    ],
    neet: ['Passes through the quadrangular space with the posterior circumflex humeral artery.'],
  },
  'Musculocutaneous nerve': {
    supply: [{ label: 'Roots', text: 'C5–C7 (lateral cord)' }],
    clinical: [
      'Lesion weakens elbow flexion and supination (biceps, brachialis); sensory loss over the lateral forearm.',
    ],
    neet: ['Pierces coracobrachialis; continues as the lateral cutaneous nerve of the forearm.'],
  },
  'Long thoracic nerve': {
    supply: [{ label: 'Roots', text: 'C5–C7 (nerve of Bell)' }],
    clinical: [
      'Injury (mastectomy, axillary node clearance, carrying heavy loads) paralyses serratus anterior: winging of scapula.',
      'Patient cannot raise the arm above the head.',
    ],
    neet: ['Winging is seen when the patient pushes against a wall.'],
  },
  'Brachial artery': {
    clinical: [
      'Blood pressure is measured over it in the cubital fossa, medial to the biceps tendon.',
      'Compressed against the humerus to control bleeding distal to the profunda brachii.',
      'Injury in supracondylar fracture leads to Volkmann ischaemic contracture.',
    ],
    neet: ['Begins at the lower border of teres major; ends at the neck of the radius by dividing into radial and ulnar arteries.'],
  },
  'Radial artery': {
    clinical: [
      'Preferred site for arterial blood gas sampling and arterial lines.',
      'Do the modified Allen test before puncture to confirm ulnar collateral supply.',
      'Pulse felt lateral to the flexor carpi radialis tendon; also in the anatomical snuffbox.',
    ],
    neet: ['Forms the deep palmar arch; ulnar artery forms the superficial palmar arch.'],
    procedure: 'ABG and arterial cannulation',
  },
  'Median cubital vein': {
    clinical: [
      'Most common site for venepuncture and IV cannulation.',
      'Separated from the brachial artery and median nerve by the bicipital aponeurosis, which protects them.',
    ],
    neet: ['Connects the cephalic and basilic veins in front of the elbow.'],
    procedure: 'Venepuncture and IV cannulation',
  },
  'Cephalic vein': {
    clinical: ['Used for cannulation and venous cutdown; lies in the deltopectoral groove.'],
    neet: ['Pierces the clavipectoral fascia to drain into the axillary vein.'],
  },
  'Supraspinatus muscle': {
    supply: [{ label: 'Nerve', text: 'Suprascapular nerve (C5, C6)' }, { label: 'Artery', text: 'Suprascapular artery' }],
    clinical: [
      'Most commonly torn rotator cuff tendon; painful arc between 60° and 120° of abduction.',
      'Empty can test (Jobe test) assesses it.',
    ],
    neet: ['Initiates abduction (first 15°); deltoid continues to 90°.'],
    imaging: 'Ultrasound and MRI show tendon tears; calcific tendinitis may be visible on X-ray.',
  },
  'Internal jugular vein': {
    clinical: [
      'Common central line site: needle at the apex of the triangle formed by the two heads of sternocleidomastoid, aimed at the ipsilateral nipple.',
      'Right side preferred: straighter path to the SVC and no thoracic duct.',
      'Complications: carotid puncture, pneumothorax, air embolism.',
    ],
    neet: ['JVP is assessed using the right internal jugular vein.'],
    procedure: 'Central venous line (IJV)',
  },
  'Femoral artery': {
    clinical: [
      'Femoral pulse at the mid-inguinal point (midway between ASIS and pubic symphysis).',
      'Access for angiography and arterial sampling when peripheral sites fail.',
    ],
    neet: ['Order in femoral triangle, lateral to medial: Nerve, Artery, Vein, (Empty space), Lymphatics (NAVEL).'],
    procedure: 'Femoral arterial puncture',
  },
  'Femoral nerve': {
    supply: [{ label: 'Roots', text: 'L2–L4 (posterior divisions)' }],
    clinical: [
      'Lesion: weak knee extension (quadriceps), lost knee jerk, sensory loss over the anterior thigh and medial leg.',
      'Femoral nerve block is given lateral to the femoral artery below the inguinal ligament.',
    ],
    neet: ['Lies outside the femoral sheath.'],
    procedure: 'Femoral nerve block',
  },
  'Common fibular nerve': {
    supply: [{ label: 'Roots', text: 'L4–S2' }],
    clinical: [
      'Most commonly injured nerve in the lower limb, as it winds around the neck of the fibula.',
      'Causes foot drop with high-stepping gait and loss of eversion.',
      'Tight plaster casts and fibular neck fractures are common causes.',
    ],
    neet: ['Also called the common peroneal nerve.'],
  },
  'Great saphenous vein': {
    clinical: [
      'Lies anterior to the medial malleolus: reliable site for venous cutdown.',
      'Used as a graft in coronary artery bypass surgery.',
      'Incompetent valves cause varicose veins; Trendelenburg test checks the saphenofemoral junction.',
    ],
    neet: ['Accompanied by the saphenous nerve in the leg; drains into the femoral vein at the saphenous opening.'],
  },
  'Sciatic nerve': {
    supply: [{ label: 'Roots', text: 'L4–S3' }],
    clinical: [
      'Intramuscular injections are given in the upper outer quadrant of the buttock to avoid it.',
      'Can be injured in posterior dislocation of the hip.',
    ],
    neet: ['Largest nerve in the body; divides into tibial and common fibular nerves, usually above the popliteal fossa.'],
    procedure: 'Gluteal IM injection',
  },
  'Middle meningeal artery': {
    clinical: [
      'Rupture under the pterion causes extradural haematoma.',
      'Classic history: head injury, lucid interval, then deterioration.',
    ],
    neet: ['Branch of the maxillary artery; enters the skull through the foramen spinosum.'],
    imaging: 'CT: biconvex (lentiform) hyperdense collection limited by sutures.',
  },
  'Vermiform appendix': {
    supply: [{ label: 'Artery', text: 'Appendicular artery (ileocolic branch of SMA)' }],
    clinical: [
      'Pain starts periumbilical (T10 visceral) and shifts to McBurney point.',
      'Retrocaecal position (most common) may give a positive psoas sign.',
    ],
    neet: ['McBurney point: junction of lateral one-third and medial two-thirds of the line from ASIS to umbilicus.'],
    imaging: 'Ultrasound: non-compressible tube over 6 mm; CT in adults.',
  },
  'Vertebra L4': {
    clinical: ['The line joining the iliac crests (Tuffier line) crosses the L4 spine or L4–L5 space.'],
    neet: ['In adults the spinal cord ends at L1–L2; lumbar puncture is done at L3–L4 or L4–L5.'],
    procedure: 'Lumbar puncture',
  },
  'Thyroid gland': {
    supply: [
      { label: 'Arteries', text: 'Superior thyroid (external carotid), inferior thyroid (thyrocervical trunk), sometimes thyroidea ima' },
    ],
    clinical: [
      'Moves with swallowing because it is enclosed in pretracheal fascia.',
      'Thyroidectomy risks the recurrent laryngeal nerve (near the inferior thyroid artery) and the external laryngeal nerve (near the superior thyroid artery).',
    ],
    neet: ['Isthmus lies over the 2nd to 4th tracheal rings.'],
    imaging: 'Ultrasound for nodules; TI-RADS grading.',
  },
  'Sternocleidomastoid muscle': {
    supply: [{ label: 'Nerve', text: 'Spinal accessory nerve (CN XI); proprioception C2–C3' }],
    clinical: [
      'Congenital torticollis from fibrosis of the muscle (sternomastoid tumour in infants).',
      'Its heads form the landmark triangle for IJV cannulation.',
    ],
    neet: ['Divides the neck into anterior and posterior triangles.'],
  },
  'Left coronary artery': {
    clinical: [
      'LAD occlusion gives anterior wall MI (leads V1–V4).',
      'Circumflex occlusion gives lateral wall MI (I, aVL, V5–V6).',
    ],
    neet: ['LAD is the most commonly occluded coronary artery ("widow maker").'],
  },
};
