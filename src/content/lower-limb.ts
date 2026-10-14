import type { Clinical } from './types';

export const LOWER_LIMB: Record<string, Clinical> = {
  Femur: {
    supply: [{ label: 'Femoral head', text: 'Mainly the medial circumflex femoral artery (retinacular branches)' }],
    clinical: [
      'Intracapsular neck fracture (elderly, after a fall) risks avascular necrosis of the head: shortened, externally rotated leg.',
      'Shaft fracture can lose 1–1.5 litres of blood; check for fat embolism.',
      'Posterior hip dislocation (dashboard injury) can injure the sciatic nerve: leg flexed, adducted, medially rotated.',
    ],
    neet: ['Garden classification grades femoral neck fractures; types III–IV usually need replacement.'],
    imaging: 'Shenton line is disrupted on AP pelvis X-ray in neck fracture and hip dislocation.',
  },
  Patella: {
    clinical: ['Lateral dislocation is common because of the Q angle; vastus medialis obliquus resists it.', 'Bipartite patella is a normal variant, usually superolateral; do not mistake for fracture.'],
    neet: ['Largest sesamoid bone in the body, within the quadriceps tendon.'],
  },
  Tibia: {
    clinical: [
      'Shaft fractures are often open because the anteromedial surface is subcutaneous.',
      'Compartment syndrome after tibial fracture: pain out of proportion and pain on passive stretch; needs fasciotomy.',
      'Intraosseous access in children uses the anteromedial surface 1–2 cm below the tibial tuberosity.',
    ],
    neet: ['Lower third of the shaft has the poorest blood supply, so non-union is common there.'],
    procedure: 'Intraosseous access',
  },
  Fibula: {
    clinical: ['Fracture of the neck can injure the common fibular nerve: foot drop.', 'Maisonneuve fracture: proximal fibular fracture with ankle syndesmosis injury.'],
    neet: ['Non-weight-bearing bone; used as a free vascularised bone graft.'],
  },
  Talus: {
    clinical: ['Neck fractures risk avascular necrosis of the body (retrograde blood supply).'],
    neet: ['No muscles attach to the talus; Hawkins sign on X-ray suggests the body is still vascular.'],
  },
  Calcaneus: {
    clinical: ['Fracture after a fall from height: check the lumbar spine as well (associated burst fracture).'],
    neet: ['Böhler angle is reduced in calcaneal fracture; most commonly fractured tarsal bone.'],
  },
  'Gluteus medius muscle': {
    supply: [{ label: 'Nerve', text: 'Superior gluteal nerve (L4–S1)' }, { label: 'Action', text: 'Abducts the hip and keeps the pelvis level in walking' }],
    clinical: [
      'Superior gluteal nerve injury: positive Trendelenburg sign; the pelvis drops on the side opposite the stance leg.',
      'Ventrogluteal IM site lies over gluteus medius, away from the sciatic nerve.',
    ],
    neet: ['Trendelenburg sign: the weak side is the stance side.'],
    procedure: 'Gluteal IM injection',
  },
  'Gluteus maximus muscle': {
    supply: [{ label: 'Nerve', text: 'Inferior gluteal nerve (L5–S2)' }, { label: 'Action', text: 'Extends the hip; used in climbing stairs and rising from sitting' }],
    clinical: ['IM injections go in the upper outer quadrant of the buttock to avoid the sciatic nerve.'],
    neet: ['Inferior gluteal nerve palsy causes a backward-lurching gait.'],
    procedure: 'Gluteal IM injection',
  },
  'Piriformis muscle': {
    clinical: ['Piriformis syndrome: sciatic nerve compression in the buttock, mimicking sciatica.'],
    neet: ['Key muscle of the gluteal region: superior gluteal vessels and nerve pass above it, most other structures below.'],
  },
  'Sartorius muscle': {
    supply: [{ label: 'Nerve', text: 'Femoral nerve' }],
    clinical: ['Forms the lateral border of the femoral triangle and the roof of the adductor canal.'],
    neet: ['Longest muscle in the body; "tailor\'s muscle" (flexes, abducts and laterally rotates the hip).'],
  },
  'Rectus femoris muscle': {
    supply: [{ label: 'Nerve', text: 'Femoral nerve' }],
    clinical: ['Knee jerk tests L3–L4 through the quadriceps.'],
    neet: ['The only quadriceps muscle that crosses the hip (flexes the hip and extends the knee).'],
  },
  'Vastus lateralis muscle': {
    supply: [{ label: 'Nerve', text: 'Femoral nerve' }],
    clinical: ['Preferred IM injection site in infants (anterolateral thigh, middle third).'],
    neet: ['Largest part of the quadriceps.'],
    procedure: 'Thigh IM injection',
  },
  'Tibialis anterior muscle': {
    supply: [{ label: 'Nerve', text: 'Deep fibular nerve (L4, L5)' }, { label: 'Action', text: 'Dorsiflexion and inversion of the foot' }],
    clinical: ['Weak in common or deep fibular nerve palsy: foot drop and high-stepping gait.'],
    neet: ['Anterior compartment syndrome affects it first.'],
  },
  'Calcaneal tendon': {
    clinical: [
      'Rupture: sudden pain "like being kicked" during push-off; Simmonds (Thompson) squeeze test is positive.',
      'Ankle jerk tests S1 (S1–S2).',
    ],
    neet: ['Thickest and strongest tendon in the body (Achilles tendon); formed by gastrocnemius and soleus.'],
  },
  Gastrocnemius: {
    supply: [{ label: 'Nerve', text: 'Tibial nerve (S1, S2)' }],
    clinical: ['Tennis leg is a tear of the medial head.'],
    neet: ['Its two heads form the lower boundaries of the popliteal fossa.'],
  },
  'Popliteal artery': {
    clinical: [
      'Most commonly injured artery in knee dislocation: always check distal pulses.',
      'Popliteal aneurysm is the most common peripheral aneurysm; often bilateral.',
    ],
    neet: ['Deepest structure in the popliteal fossa; the tibial nerve is the most superficial.'],
  },
  'Dorsalis pedis artery': {
    clinical: ['Pulse felt lateral to the extensor hallucis longus tendon on the dorsum of the foot; absent in about 10% of normal people.'],
    neet: ['Continuation of the anterior tibial artery in front of the ankle.'],
  },
  'Posterior tibial artery': {
    clinical: ['Pulse felt behind the medial malleolus, midway between it and the calcaneal tendon.'],
    neet: ['Behind the medial malleolus, front to back: Tom, Dick And Very Nervous Harry (tibialis posterior, FDL, artery, vein, nerve, FHL).'],
  },
  'Femoral vein': {
    clinical: ['Femoral central line: puncture medial to the femoral pulse, about 1–2 cm below the inguinal ligament.', 'Common site for DVT.'],
    neet: ['Lies medial to the femoral artery in the femoral sheath.'],
    procedure: 'Femoral venous access',
  },
  'Tibial nerve': {
    supply: [{ label: 'Roots', text: 'L4–S3' }],
    clinical: ['Lesion: loss of plantarflexion and toe flexion, sensory loss of the sole; tarsal tunnel syndrome compresses it behind the medial malleolus.'],
    neet: ['Most superficial structure in the popliteal fossa.'],
  },
  'Superior gluteal nerve': {
    supply: [{ label: 'Roots', text: 'L4–S1' }],
    clinical: ['Injured by a badly placed IM injection or hip surgery: Trendelenburg gait.'],
    neet: ['Only structure passing above piriformis through the greater sciatic foramen (with the superior gluteal vessels).'],
  },
  'Obturator nerve': {
    supply: [{ label: 'Roots', text: 'L2–L4 (anterior divisions)' }],
    clinical: ['Ovarian disease or obturator hernia can refer pain to the medial knee through this nerve.'],
    neet: ['Supplies the adductor muscles of the thigh.'],
  },
  'Anterior cruciate ligament': {
    clinical: [
      'Torn by twisting on a planted foot; a pop with rapid swelling (haemarthrosis).',
      'Lachman test is the most sensitive clinical test; anterior drawer test also used.',
    ],
    neet: ['Unhappy triad (O\'Donoghue): ACL, medial collateral ligament and medial meniscus.'],
    imaging: 'MRI confirms the tear; Segond fracture on X-ray is strongly associated.',
  },
  'Posterior cruciate ligament': {
    clinical: ['Dashboard injury pushes the tibia backwards; posterior sag and posterior drawer test are positive.'],
    neet: ['Stronger than the ACL; prevents posterior displacement of the tibia on the femur.'],
  },
  'Medial meniscus': {
    clinical: ['Torn more often than the lateral meniscus; locking and joint line tenderness; McMurray test.'],
    neet: ['Less mobile because it is attached to the tibial collateral ligament.'],
  },
  'Tibial collateral ligament': {
    clinical: ['Valgus stress injury; tested with the knee in 30° of flexion.'],
    neet: ['Its deep fibres attach to the medial meniscus.'],
  },
  'Anterior talofibular ligament': {
    clinical: ['Most commonly injured ligament in an inversion ankle sprain.'],
    neet: ['Ottawa ankle rules decide who needs an X-ray.'],
  },
};
