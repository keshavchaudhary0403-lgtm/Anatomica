import type { Ref } from './procedures';

/** A point on the model: a named landmark on a structure. */
export interface Pin { on: Ref; lm: string }
export interface Level {
  title: string;
  pin: Pin;
  /** Muscles paralysed (nerves) or territory at risk (arteries), shown in red. */
  affected: Ref[];
  /** Collateral routes (arteries), shown in teal. */
  collaterals?: Ref[];
  signs: string[];
  causes: string[];
}
export interface Pathway {
  id: string;
  kind: 'nerve' | 'artery';
  title: string;
  roots?: string;
  summary: string;
  view: 'front' | 'back' | 'right' | 'front-right' | 'back-right';
  /** Structures traced along the course, proximal to distal (amber). */
  course: Ref[];
  levels: Level[];
}

const R = (n: string): Ref => ({ n, s: 'right' });
const N = (n: string): Ref => ({ n });
const pin = (on: string, lm: string): Pin => ({ on: R(on), lm });

// Muscle groups reused across levels.
const RADIAL_FOREARM = ['Brachioradialis muscle', 'Extensor carpi radialis longus', 'Extensor carpi radialis brevis', 'Supinator', 'Extensor digitorum', 'Extensor digiti minimi', 'Humeral head of extensor carpi ulnaris', 'Ulnar head of extensor carpi ulnaris', 'Abductor pollicis longus', 'Extensor pollicis brevis', 'Extensor pollicis longus', 'Extensor indicis'].map(R);
const PIN_MUSCLES = ['Extensor digitorum', 'Extensor digiti minimi', 'Humeral head of extensor carpi ulnaris', 'Ulnar head of extensor carpi ulnaris', 'Abductor pollicis longus', 'Extensor pollicis brevis', 'Extensor pollicis longus', 'Extensor indicis'].map(R);
const TRICEPS = ['Long head of triceps brachii', 'Lateral head of triceps brachii', 'Medial head of triceps brachii', 'Anconeus muscle'].map(R);
const THENAR = ['Abductor pollicis brevis', 'Opponens pollicis muscle', 'Superficial head of flexor pollicis brevis'].map(R);
const MEDIAN_FOREARM = ['Superficial head of pronator teres', 'Deep head of pronator teres', 'Flexor carpi radialis', 'Palmaris longus muscle', 'Radial head of flexor digitorum superficialis', 'Flexor pollicis longus', 'Pronator quadratus'].map(R);
const ULNAR_HAND = ['Abductor digiti minimi of hand', 'Flexor digiti minimi of hand', 'Opponens digiti minimi muscle of hand', 'Dorsal interossei muscles of hand', 'Palmar interossei muscles', 'Oblique head of adductor pollicis', 'Transverse head of adductor pollicis', 'Deep head of flexor pollicis brevis'].map(R);
const DEEP_FIBULAR = ['Tibialis anterior muscle', 'Extensor digitorum longus', 'Extensor hallucis longus', 'Fibularis tertius muscle', 'Extensor digitorum brevis'].map(R);
const SUPERFICIAL_FIBULAR = ['Fibularis longus muscle', 'Fibularis brevis muscle'].map(R);
const TIBIAL_LEG = ['Lateral head of gastrocnemius', 'Medial head of gastrocnemius', 'Soleus muscle', 'Plantaris muscle', 'Popliteus muscle', 'Tibialis posterior muscle', 'Flexor digitorum longus', 'Flexor hallucis longus'].map(R);
const SOLE = ['Abductor hallucis', 'Flexor digitorum brevis', 'Quadratus plantae muscle', 'Dorsal interossei muscles of foot', 'Abductor digiti minimi of foot', 'Flexor digiti minimi of foot', 'Lumbrical muscles of foot'].map(R);
const HAMSTRINGS = ['Long head of biceps femoris', 'Short head of biceps femoris', 'Semitendinosus muscle', 'Semimembranosus muscle'].map(R);
const QUADRICEPS = ['Rectus femoris muscle', 'Vastus lateralis muscle', 'Vastus medialis muscle', 'Vastus intermedius muscle'].map(R);

export const PATHWAYS: Pathway[] = [
  {
    id: 'radial', kind: 'nerve', title: 'Radial nerve', roots: 'C5–T1, posterior cord',
    summary: 'Extensors of arm and forearm. The level of injury decides whether triceps and the wrist are spared.',
    view: 'back-right',
    course: [R('Posterior cord of brachial plexus'), R('Radial nerve'), R('Deep branch of radial nerve'), R('Posterior interosseous nerve of forearm'), R('Superficial branch of radial nerve')],
    levels: [
      { title: 'Axilla', pin: pin('Humerus', 'Surgical neck of humerus'), affected: [...TRICEPS, ...RADIAL_FOREARM],
        signs: ['Loss of elbow extension; triceps jerk absent', 'Wrist drop and finger drop', 'Sensory loss over the back of arm, forearm and first web space'],
        causes: ['Crutch palsy', 'Proximal humerus fracture'] },
      { title: 'Spiral (radial) groove', pin: pin('Humerus', 'Radial groove'), affected: [R('Lateral head of triceps brachii'), R('Anconeus muscle'), ...RADIAL_FOREARM],
        signs: ['Wrist drop and finger drop', 'Elbow extension largely preserved (branches to long and medial heads arise higher)', 'Sensory loss over the first dorsal web space'],
        causes: ['Mid-shaft humerus fracture', '"Saturday night" palsy (arm over a chair)'] },
      { title: 'Elbow (deep branch)', pin: pin('Radius', 'Neck of radius'), affected: PIN_MUSCLES,
        signs: ['Finger drop without wrist drop: ECRL still extends the wrist, with radial deviation', 'No sensory loss'],
        causes: ['Radial head fracture or dislocation (Monteggia)', 'Compression at the arcade of Frohse in supinator'] },
      { title: 'Wrist (superficial branch)', pin: pin('Radius', 'Radial styloid process'), affected: [],
        signs: ['No weakness', 'Numbness or tingling over the dorsum of the thumb and first web space'],
        causes: ['Cannulation of the cephalic vein at the wrist', 'Tight watch strap or handcuffs (cheiralgia paraesthetica)'] },
    ],
  },
  {
    id: 'median', kind: 'nerve', title: 'Median nerve', roots: 'C5–T1, lateral and medial cords',
    summary: 'Forearm flexors and the thenar muscles. Carpal tunnel is the commonest site.',
    view: 'front-right',
    course: [R('Median nerve'), R('Anterior interosseous nerve of forearm'), R('Palmar branch of median nerve'), R('Common palmar digital branches of median nerve'), R('Proper palmar digital branches of median nerve')],
    levels: [
      { title: 'Above the elbow', pin: pin('Humerus', 'Medial supracondylar ridge'), affected: [...MEDIAN_FOREARM, ...THENAR],
        signs: ['Hand of benediction on trying to make a fist (index and middle fingers stay straight)', 'Forearm held supinated; weak wrist flexion with ulnar deviation', 'Ape thumb; sensory loss of lateral palm and lateral three and a half fingers'],
        causes: ['Supracondylar fracture of humerus', 'Ligament of Struthers'] },
      { title: 'Anterior interosseous branch', pin: pin('Radius', 'Anterior surface of radius'), affected: [R('Flexor pollicis longus'), R('Pronator quadratus')],
        signs: ['Cannot make the "OK" sign: pinches with straight thumb and index tips', 'No sensory loss'],
        causes: ['Forearm fractures', 'Neuritis (Parsonage–Turner)'] },
      { title: 'Wrist (carpal tunnel)', pin: pin('Radius', 'Carpal articular surface'), affected: THENAR,
        signs: ['Thenar wasting; weak abduction and opposition of thumb', 'Tingling of lateral three and a half fingers, worse at night', 'Palm sensation spared (palmar branch passes above the retinaculum)', 'Phalen and Tinel tests positive'],
        causes: ['Carpal tunnel syndrome (pregnancy, hypothyroidism, diabetes, rheumatoid arthritis)', 'Wrist lacerations'] },
    ],
  },
  {
    id: 'ulnar', kind: 'nerve', title: 'Ulnar nerve', roots: 'C8–T1, medial cord',
    summary: 'Intrinsic hand muscles. Behind the medial epicondyle and in Guyon canal.',
    view: 'front-right',
    course: [R('Ulnar nerve'), R('Dorsal branch of ulnar nerve'), R('Superficial branch of ulnar nerve'), R('Deep branch of ulnar nerve'), R('Proper palmar digital branches of ulnar nerve')],
    levels: [
      { title: 'Elbow (behind medial epicondyle)', pin: pin('Humerus', 'Groove for ulnar nerve'), affected: [R('Humeral head of flexor carpi ulnaris'), R('Ulnar head of flexor carpi ulnaris'), R('Flexor digitorum profundus'), ...ULNAR_HAND],
        signs: ['Mild clawing of ring and little fingers (FDP also weak: ulnar paradox)', 'Radial deviation on wrist flexion', 'Positive card test and Froment sign', 'Sensory loss of medial one and a half fingers, front and back'],
        causes: ['Medial epicondyle fracture', 'Cubital tunnel syndrome; tardy ulnar palsy after cubitus valgus'] },
      { title: 'Wrist (Guyon canal)', pin: pin('Ulna', 'Ulnar styloid process'), affected: ULNAR_HAND,
        signs: ['Marked claw hand of ring and little fingers', 'Wasting of hypothenar eminence and first dorsal interosseous', 'Dorsal sensation spared (dorsal branch arises above the wrist)'],
        causes: ['Wrist lacerations', 'Hook of hamate fracture; cyclists (handlebar palsy)'] },
    ],
  },
  {
    id: 'axillary', kind: 'nerve', title: 'Axillary nerve', roots: 'C5–C6, posterior cord',
    summary: 'Deltoid and teres minor. Winds round the surgical neck of the humerus.',
    view: 'back-right',
    course: [R('Axillary nerve'), R('Muscular branches of axillary nerve'), R('Superior lateral brachial cutaneous nerve')],
    levels: [
      { title: 'Surgical neck / quadrangular space', pin: pin('Humerus', 'Surgical neck of humerus'), affected: [R('Acromial part of deltoid muscle'), R('Clavicular part of deltoid muscle'), R('Scapular spinal part of deltoid muscle'), R('Teres minor muscle')],
        signs: ['Loss of abduction from 15° to 90°', 'Flattened shoulder contour over time', 'Sensory loss over the regimental badge area'],
        causes: ['Anterior dislocation of the shoulder', 'Surgical neck fracture', 'Badly placed deltoid injection'] },
    ],
  },
  {
    id: 'musculocutaneous', kind: 'nerve', title: 'Musculocutaneous nerve', roots: 'C5–C7, lateral cord',
    summary: 'Front of arm. Pierces coracobrachialis, ends as the lateral cutaneous nerve of the forearm.',
    view: 'front-right',
    course: [R('Musculocutaneous nerve'), R('Lateral antebrachial cutaneous nerve')],
    levels: [
      { title: 'Axilla / upper arm', pin: pin('Scapula', 'Coracoid process'), affected: [R('Coracobrachialis muscle'), R('Long head of biceps brachii'), R('Short head of biceps brachii'), R('Brachialis muscle')],
        signs: ['Weak elbow flexion (brachioradialis still helps) and weak supination', 'Biceps jerk absent', 'Sensory loss over the lateral forearm'],
        causes: ['Penetrating injury', 'Rare in isolation; part of upper trunk lesions'] },
    ],
  },
  {
    id: 'common-fibular', kind: 'nerve', title: 'Common fibular nerve', roots: 'L4–S2',
    summary: 'Front and lateral leg. Most commonly injured nerve in the lower limb, at the neck of the fibula.',
    view: 'front-right',
    course: [R('Common fibular nerve'), R('Deep fibular nerve'), R('Superficial fibular nerve')],
    levels: [
      { title: 'Neck of fibula', pin: pin('Fibula', 'Neck of fibula'), affected: [...DEEP_FIBULAR, ...SUPERFICIAL_FIBULAR],
        signs: ['Foot drop with high-stepping gait', 'Loss of dorsiflexion and eversion; foot held plantarflexed and inverted', 'Sensory loss over the dorsum of foot and lateral leg'],
        causes: ['Fracture of the neck of fibula', 'Tight plaster cast or prolonged leg crossing'] },
      { title: 'Deep fibular branch', pin: pin('Tibia', 'Lateral surface of tibia'), affected: DEEP_FIBULAR,
        signs: ['Foot drop; eversion preserved', 'Sensory loss limited to the first web space of the foot'],
        causes: ['Anterior compartment syndrome'] },
      { title: 'Superficial fibular branch', pin: pin('Fibula', 'Lateral surface of fibula'), affected: SUPERFICIAL_FIBULAR,
        signs: ['Weak eversion', 'Sensory loss over most of the dorsum of the foot, sparing the first web space'],
        causes: ['Lateral compartment injury', 'Entrapment where it pierces the deep fascia'] },
    ],
  },
  {
    id: 'tibial', kind: 'nerve', title: 'Tibial nerve', roots: 'L4–S3',
    summary: 'Back of leg and sole. Deep and well protected, so injuries are less common.',
    view: 'back-right',
    course: [R('Tibial nerve')],
    levels: [
      { title: 'Popliteal fossa', pin: pin('Femur', 'Popliteal surface of femur'), affected: [...TIBIAL_LEG, ...SOLE],
        signs: ['Loss of plantarflexion: cannot stand on tiptoe; ankle jerk lost', 'Foot held dorsiflexed and everted (calcaneovalgus)', 'Sensory loss of the sole'],
        causes: ['Knee dislocation', 'Supracondylar femur fracture'] },
      { title: 'Ankle (tarsal tunnel)', pin: pin('Tibia', 'Medial malleolus'), affected: SOLE,
        signs: ['Burning pain and numbness of the sole', 'Weak intrinsic foot muscles; clawing of toes'],
        causes: ['Tarsal tunnel syndrome behind the medial malleolus'] },
    ],
  },
  {
    id: 'sciatic', kind: 'nerve', title: 'Sciatic nerve', roots: 'L4–S3',
    summary: 'Largest nerve in the body. Hamstrings, then everything below the knee through its two branches.',
    view: 'back-right',
    course: [R('Sciatic nerve'), R('Tibial nerve'), R('Common fibular nerve')],
    levels: [
      { title: 'Gluteal region', pin: pin('Hip bone', 'Greater sciatic notch'), affected: [...HAMSTRINGS, R('Adductor magnus'), ...TIBIAL_LEG, ...DEEP_FIBULAR, ...SUPERFICIAL_FIBULAR, ...SOLE],
        signs: ['Weak knee flexion', 'Complete paralysis below the knee: foot drop, flail foot', 'Sensory loss below the knee except the medial side (saphenous nerve)', 'Ankle jerk lost; knee jerk preserved'],
        causes: ['Posterior dislocation of the hip', 'Misplaced gluteal injection', 'Piriformis syndrome'] },
    ],
  },
  {
    id: 'femoral', kind: 'nerve', title: 'Femoral nerve', roots: 'L2–L4, posterior divisions',
    summary: 'Front of thigh. Lies lateral to the femoral artery, outside the femoral sheath.',
    view: 'front-right',
    course: [R('Femoral nerve'), R('Anterior cutaneous branches of femoral nerve'), R('Saphenous nerve')],
    levels: [
      { title: 'Inguinal ligament', pin: pin('Hip bone', 'Anterior superior iliac spine'), affected: [R('Iliacus muscle'), R('Pectineus muscle'), R('Sartorius muscle'), ...QUADRICEPS],
        signs: ['Cannot extend the knee; knee gives way', 'Knee jerk lost', 'Sensory loss over the front of the thigh and medial leg'],
        causes: ['Psoas haematoma (anticoagulants)', 'Femoral catheterisation; hip surgery'] },
    ],
  },
  {
    id: 'ul-arteries', kind: 'artery', title: 'Upper limb arteries', summary: 'Subclavian to the palmar arches. Ligation is safe where collaterals bridge the gap.',
    view: 'front-right',
    course: [R('Right subclavian artery'), R('Axillary artery'), R('Brachial artery'), R('Radial artery'), R('Ulnar artery'), R('Superficial palmar arch'), R('Deep palmar arch')],
    levels: [
      { title: 'Axillary artery, 3rd part', pin: pin('Humerus', 'Surgical neck of humerus'), affected: [R('Brachial artery')],
        collaterals: [R('Thyrocervical trunk'), R('Suprascapular artery'), R('Subscapular artery'), R('Circumflex scapular artery')],
        signs: ['Ligation proximal to the subscapular artery is usually safe: the scapular anastomosis fills it', 'Distal to the subscapular artery, the limb is at risk'],
        causes: ['Anterior shoulder dislocation in the elderly', 'Proximal humerus fracture'] },
      { title: 'Brachial artery, at the elbow', pin: pin('Humerus', 'Medial supracondylar ridge'), affected: MEDIAN_FOREARM,
        collaterals: [R('Superior ulnar collateral artery'), R('Inferior ulnar collateral artery'), R('Radial collateral artery'), R('Ulnar recurrent artery')],
        signs: ['Pain on passive finger extension, pallor, pulselessness', 'Untreated: Volkmann ischaemic contracture of the forearm flexors'],
        causes: ['Supracondylar fracture of humerus in children', 'Tight cast'] },
      { title: 'Radial artery at the wrist', pin: pin('Radius', 'Radial styloid process'), affected: [],
        collaterals: [R('Ulnar artery'), R('Superficial palmar arch'), R('Deep palmar arch')],
        signs: ['Hand stays perfused through the ulnar artery and palmar arches if the Allen test is normal'],
        causes: ['ABG puncture or arterial line', 'Harvest for coronary bypass'] },
    ],
  },
  {
    id: 'll-arteries', kind: 'artery', title: 'Lower limb arteries', summary: 'External iliac to dorsalis pedis. The profunda femoris and genicular arteries form the collaterals.',
    view: 'front-right',
    course: [R('External iliac artery'), R('Femoral artery'), R('Deep femoral artery'), R('Popliteal artery'), R('Anterior tibial artery'), R('Posterior tibial artery'), R('Fibular artery'), R('Dorsalis pedis artery')],
    levels: [
      { title: 'Superficial femoral artery (adductor canal)', pin: pin('Femur', 'Adductor tubercle'), affected: [R('Lateral head of gastrocnemius'), R('Medial head of gastrocnemius'), R('Soleus muscle')],
        collaterals: [R('Deep femoral artery'), R('Descending branch of lateral circumflex femoral artery'), R('Superior medial genicular artery'), R('Superior lateral genicular artery')],
        signs: ['Calf claudication: pain on walking, relieved by rest', 'Popliteal and foot pulses reduced or absent'],
        causes: ['Atherosclerosis (commonest site in the leg is the adductor canal)'] },
      { title: 'Popliteal artery', pin: pin('Femur', 'Popliteal surface of femur'), affected: [...TIBIAL_LEG, ...DEEP_FIBULAR, ...SUPERFICIAL_FIBULAR],
        collaterals: [R('Superior medial genicular artery'), R('Inferior medial genicular artery'), R('Inferior lateral genicular artery'), R('Middle genicular artery')],
        signs: ['Acute ischaemia of the leg: the 6 Ps (pain, pallor, pulselessness, paraesthesia, paralysis, perishingly cold)', 'Genicular collaterals are often not enough after acute injury'],
        causes: ['Posterior knee dislocation', 'Popliteal aneurysm thrombosis'] },
      { title: 'Ankle pulses', pin: pin('Tibia', 'Medial malleolus'), affected: [],
        collaterals: [R('Arcuate artery'), R('Deep plantar artery'), R('Lateral plantar artery')],
        signs: ['Dorsalis pedis: lateral to the extensor hallucis longus tendon (absent in about 10%)', 'Posterior tibial: behind the medial malleolus', 'Ankle–brachial index below 0.9 suggests peripheral arterial disease'],
        causes: ['Diabetic and peripheral arterial disease'] },
    ],
  },
];
