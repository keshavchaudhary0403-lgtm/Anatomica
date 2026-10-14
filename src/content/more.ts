import type { Clinical, Region } from './types';

// Second batch of notes, grouped by region. Draft content: check against your textbook.
export const MORE: Partial<Record<Region, Record<string, Clinical>>> = {
  'Upper limb': {
    'Rhomboid major muscle': {
      supply: [{ label: 'Nerve', text: 'Dorsal scapular nerve (C5)' }],
      clinical: ['Dorsal scapular nerve injury causes mild winging of the medial border of the scapula.'],
      neet: ['Rhomboids and levator scapulae retract and elevate the scapula.'],
    },
    'Levator scapulae': {
      supply: [{ label: 'Nerve', text: 'C3, C4 and dorsal scapular nerve (C5)' }],
      clinical: ['A common site of neck and shoulder muscle strain ("stiff neck").'],
      neet: ['Elevates the scapula and rotates it downwards.'],
    },
    'Palmaris longus muscle': {
      supply: [{ label: 'Nerve', text: 'Median nerve' }],
      clinical: ['Absent in about 15% of people; its tendon is a common tendon graft.', 'Landmark for the median nerve, which lies just deep and lateral to it at the wrist.'],
      neet: ['Test: oppose thumb and little finger with the wrist flexed; the tendon stands out.'],
    },
    'Flexor digitorum profundus': {
      supply: [{ label: 'Nerve', text: 'Medial half: ulnar nerve; lateral half: anterior interosseous nerve (median)' }],
      clinical: ['Jersey finger: avulsion of the FDP tendon from the distal phalanx, usually the ring finger.', 'Test by holding the middle phalanx straight and asking the patient to bend the fingertip.'],
      neet: ['Only muscle that flexes the distal interphalangeal joints.'],
    },
    'Extensor digitorum': {
      supply: [{ label: 'Nerve', text: 'Posterior interosseous nerve' }],
      clinical: ['Mallet finger: rupture of the extensor tendon at the distal phalanx; DIP joint droops.', 'Boutonnière deformity: central slip injury at the PIP joint.'],
      neet: ['Forms the extensor expansion (dorsal digital expansion) with the lumbricals and interossei.'],
    },
    'Pronator quadratus': {
      supply: [{ label: 'Nerve', text: 'Anterior interosseous nerve' }],
      clinical: ['The pronator quadratus fat pad sign on lateral wrist X-ray suggests an occult distal radius fracture.'],
      neet: ['Main pronator of the forearm; pronator teres assists in rapid or resisted pronation.'],
    },
    'Abductor digiti minimi of hand': {
      supply: [{ label: 'Nerve', text: 'Deep branch of ulnar nerve' }],
      clinical: ['Wasting of the hypothenar eminence is seen in ulnar nerve lesions.'],
      neet: ['Hypothenar muscles: abductor, flexor and opponens digiti minimi.'],
    },
  },
  Thorax: {
    'Aortic arch': {
      clinical: ['Aortic knuckle is visible on a chest X-ray; widened in aneurysm or dissection.', 'Left recurrent laryngeal nerve hooks under it: hoarseness in arch aneurysm.'],
      neet: ['Branches from right to left: brachiocephalic trunk, left common carotid, left subclavian.', 'Begins and ends at the level of the sternal angle (T4).'],
    },
    'Ascending aorta': {
      clinical: ['Type A aortic dissection involves the ascending aorta and needs emergency surgery.'],
      neet: ['Its only branches are the right and left coronary arteries.'],
    },
    'Brachiocephalic trunk': {
      clinical: ['Can be injured in a low tracheostomy; a tracheo-innominate fistula causes massive bleeding.'],
      neet: ['Divides behind the right sternoclavicular joint into the right subclavian and right common carotid arteries.'],
    },
    'Right main bronchus': {
      clinical: ['Inhaled foreign bodies and a too-deep endotracheal tube go into the right main bronchus.'],
      neet: ['Shorter, wider and more vertical than the left; gives the upper lobe bronchus before entering the hilum.'],
    },
    'Left main bronchus': {
      clinical: ['Left atrial enlargement widens the carina angle.'],
      neet: ['Longer and more horizontal than the right; passes under the arch of the aorta.'],
    },
    'Great cardiac vein': {
      clinical: ['Coronary sinus and its tributaries are used for biventricular pacing leads.'],
      neet: ['Runs with the left anterior descending artery in the anterior interventricular groove.'],
    },
    Thymus: {
      clinical: ['Thymoma is associated with myasthenia gravis; thymectomy can improve it.', 'DiGeorge syndrome: absent thymus with T-cell deficiency and hypocalcaemia.'],
      neet: ['Lies in the superior and anterior mediastinum; large in children, involutes after puberty.'],
      imaging: 'Normal thymus in infants gives the "sail sign" on chest X-ray.',
    },
    'Right atrium': {
      clinical: ['Central lines end at the junction of the SVC and right atrium.', 'Atrial septal defect (secundum type) is the commonest ASD.'],
      neet: ['SA node lies at the junction of the SVC and right atrium, in the crista terminalis.'],
    },
  },
  'Abdomen and pelvis': {
    'External abdominal oblique muscle': {
      supply: [{ label: 'Nerve', text: 'Lower six thoracic nerves (T7–T12)' }],
      clinical: ['Its aponeurosis forms the inguinal ligament and the anterior wall of the inguinal canal.', 'Superficial inguinal ring is an opening in this aponeurosis.'],
      neet: ['Fibres run downwards and forwards, like hands in the front pockets.'],
    },
    'Internal abdominal oblique muscle': {
      supply: [{ label: 'Nerve', text: 'T7–T12 and L1 (ilio-inguinal, iliohypogastric)' }],
      clinical: ['Forms the conjoint tendon with transversus abdominis, which strengthens the posterior wall of the inguinal canal.', 'Its lower fibres form the cremaster muscle.'],
      neet: ['Forms the roof of the inguinal canal (arching fibres) with transversus abdominis.'],
    },
    'Transversus abdominis muscle': {
      supply: [{ label: 'Nerve', text: 'T7–T12 and L1' }],
      clinical: ['Transversus abdominis plane (TAP) block puts local anaesthetic between internal oblique and transversus for abdominal wall analgesia.'],
      neet: ['Deepest of the three flat abdominal muscles; the nerves of the abdominal wall run between it and internal oblique.'],
    },
    'Quadratus lumborum muscle': {
      supply: [{ label: 'Nerve', text: 'T12 and L1–L4 ventral rami' }],
      clinical: ['Common source of low back pain; quadratus lumborum block is used after abdominal surgery.'],
      neet: ['Lies behind the kidney with psoas major; fixes the 12th rib in inspiration.'],
    },
    'Psoas major': {
      supply: [{ label: 'Nerve', text: 'L1–L3 ventral rami' }],
      clinical: ['Psoas abscess (often tuberculous from the spine) tracks down to the groin below the inguinal ligament.', 'Psoas sign: pain on hip extension in retrocaecal appendicitis.'],
      neet: ['With iliacus forms iliopsoas, the strongest flexor of the hip; inserts on the lesser trochanter.'],
    },
    'Iliacus muscle': {
      supply: [{ label: 'Nerve', text: 'Femoral nerve (L2, L3)' }],
      clinical: ['Iliacus haematoma (on anticoagulants) can compress the femoral nerve.'],
      neet: ['Arises from the iliac fossa; joins psoas major to form iliopsoas.'],
    },
    'Pubococcygeus muscle': {
      supply: [{ label: 'Nerve', text: 'Nerve to levator ani (S4) and pudendal nerve' }],
      clinical: ['Part of levator ani; damaged in childbirth, leading to prolapse and stress incontinence.', 'Pelvic floor (Kegel) exercises strengthen it.'],
      neet: ['Levator ani = pubococcygeus (with puborectalis) + iliococcygeus.'],
    },
    'Coeliac trunk': {
      clinical: ['Supplies the foregut: stomach, first half of duodenum, liver, gallbladder, pancreas (part) and spleen.', 'Median arcuate ligament syndrome: the diaphragm compresses the trunk causing post-meal pain.'],
      neet: ['Arises at T12; branches are the left gastric, splenic and common hepatic arteries.'],
    },
    'Superior mesenteric artery': {
      clinical: ['Acute mesenteric ischaemia (embolus usually lodges just beyond the middle colic origin): pain out of proportion to signs.', 'Crosses the third part of the duodenum; can compress it or the left renal vein.'],
      neet: ['Arises at L1; supplies the midgut from the second part of the duodenum to two-thirds of the transverse colon.'],
    },
    'Inferior mesenteric artery': {
      clinical: ['Watershed between SMA and IMA territories at the splenic flexure is prone to ischaemic colitis.'],
      neet: ['Arises at L3; supplies the hindgut; continues as the superior rectal artery.'],
    },
    'Splenic artery': {
      clinical: ['Tortuous course along the upper border of the pancreas; a common site of visceral aneurysm, which can rupture in pregnancy.'],
      neet: ['Gives short gastric and left gastro-omental arteries and pancreatic branches.'],
    },
    'Common hepatic artery': {
      clinical: ['Variants are common: a replaced right hepatic artery from the SMA in about 15%; important in liver and pancreatic surgery.'],
      neet: ['Branches: gastroduodenal artery and proper hepatic artery (which gives the right gastric artery).'],
    },
    'Left gastric artery': {
      clinical: ['Bleeding lesser curvature ulcers and oesophageal varices (via left gastric vein) involve its territory.'],
      neet: ['Smallest branch of the coeliac trunk; gives oesophageal branches.'],
    },
    'Hepatic portal vein': {
      clinical: [
        'Portal hypertension opens portosystemic anastomoses: oesophageal varices, caput medusae, rectal varices.',
        'Commonest cause in India includes cirrhosis and extrahepatic portal vein obstruction in children.',
      ],
      neet: ['Formed behind the neck of the pancreas by the superior mesenteric and splenic veins.'],
      imaging: 'Doppler ultrasound shows flow direction and portal vein thrombosis.',
    },
    'Right renal artery': {
      clinical: ['Renal artery stenosis (atherosclerosis in the elderly, fibromuscular dysplasia in young women) causes secondary hypertension.'],
      neet: ['Right renal artery is longer and passes behind the IVC.'],
    },
    'Suprarenal gland': {
      clinical: ['Phaeochromocytoma (medulla): episodic headache, sweating and palpitations with hypertension.', 'Addison disease (cortex failure): hypotension, hyperpigmentation, hyponatraemia, hyperkalaemia.'],
      neet: ['Three arteries (superior, middle, inferior suprarenal) but one vein; the left vein drains into the left renal vein.'],
    },
    Jejunum: {
      clinical: ['Distinguished from ileum at surgery by thicker wall, wider lumen, longer vasa recta and fewer arcades.'],
      neet: ['Plicae circulares are prominent in the jejunum ("feathery" pattern on barium study).'],
    },
    'Ascending colon': {
      clinical: ['Right-sided colon cancer presents with anaemia and a mass rather than obstruction.'],
      neet: ['Retroperitoneal; supplied by the ileocolic and right colic arteries.'],
    },
    'Transverse colon': {
      clinical: ['Toxic megacolon in ulcerative colitis usually affects the transverse colon (over 6 cm on X-ray).'],
      neet: ['Intraperitoneal with the transverse mesocolon; supplied by the middle colic artery.'],
    },
    'Descending colon': {
      clinical: ['Left-sided colon cancer tends to cause change in bowel habit and obstruction.'],
      neet: ['Retroperitoneal; supplied by the left colic artery (IMA).'],
    },
    'Greater omentum': {
      clinical: ['The "abdominal policeman": walls off inflamed organs such as an appendix.', 'Omental caking on CT suggests peritoneal spread of ovarian cancer.'],
      neet: ['Hangs from the greater curvature of the stomach; contains the gastro-omental vessels.'],
    },
    'Pubic symphysis': {
      clinical: ['Symphysis pubis dysfunction causes pelvic pain in pregnancy.', 'Wide diastasis in pelvic fracture ("open book") can cause major bleeding.'],
      neet: ['Secondary cartilaginous joint (symphysis) with a fibrocartilaginous disc.'],
    },
  },
  'Lower limb': {
    'Adductor longus': {
      supply: [{ label: 'Nerve', text: 'Obturator nerve (anterior division)' }],
      clinical: ['Groin strain in footballers.', 'Forms the medial border of the femoral triangle.'],
      neet: ['Femoral triangle: inguinal ligament (base), sartorius (lateral), medial border of adductor longus (medial).'],
    },
    'Adductor magnus': {
      supply: [{ label: 'Nerve', text: 'Adductor part: obturator nerve; hamstring part: tibial part of sciatic nerve' }],
      clinical: ['The adductor hiatus in its tendon is where the femoral artery becomes the popliteal artery.'],
      neet: ['Hybrid muscle: dual nerve supply.'],
    },
    'Gracilis muscle': {
      supply: [{ label: 'Nerve', text: 'Obturator nerve' }],
      clinical: ['Common donor muscle for free flaps and tendon grafts.'],
      neet: ['Pes anserinus: sartorius, gracilis and semitendinosus insert together on the upper medial tibia ("SGT").'],
    },
    'Tensor fasciae latae': {
      supply: [{ label: 'Nerve', text: 'Superior gluteal nerve' }],
      clinical: ['Helps keep the pelvis level in walking with gluteus medius; weak in superior gluteal nerve injury.'],
      neet: ['Inserts into the iliotibial tract.'],
    },
    'Iliotibial tract': {
      clinical: ['Iliotibial band syndrome: lateral knee pain in runners from friction over the lateral femoral epicondyle.'],
      neet: ['Thickened lateral part of the fascia lata; receives tensor fasciae latae and most of gluteus maximus.'],
    },
    'Long head of biceps femoris': {
      supply: [{ label: 'Nerve', text: 'Tibial part of sciatic nerve; short head by the common fibular part' }],
      clinical: ['Hamstring strains are common in sprinters, usually at the musculotendinous junction of biceps femoris.'],
      neet: ['Hamstrings cross both hip and knee: extend the hip and flex the knee.'],
    },
    'Semitendinosus muscle': {
      supply: [{ label: 'Nerve', text: 'Tibial part of sciatic nerve' }],
      clinical: ['Its tendon is commonly harvested for ACL reconstruction.'],
      neet: ['Part of the pes anserinus with sartorius and gracilis.'],
    },
    'Soleus muscle': {
      supply: [{ label: 'Nerve', text: 'Tibial nerve (S1, S2)' }],
      clinical: ['Called the "peripheral heart": its venous sinuses pump blood upwards; stasis there predisposes to DVT.'],
      neet: ['Acts on the ankle only; gastrocnemius also flexes the knee.'],
    },
    'Tibialis posterior muscle': {
      supply: [{ label: 'Nerve', text: 'Tibial nerve' }],
      clinical: ['Tibialis posterior dysfunction is the commonest cause of adult acquired flat foot.'],
      neet: ['Main invertor of the foot and a key supporter of the medial longitudinal arch.'],
    },
    'Fibularis longus muscle': {
      supply: [{ label: 'Nerve', text: 'Superficial fibular nerve' }],
      clinical: ['Weak eversion in superficial fibular nerve injury.'],
      neet: ['Its tendon crosses the sole to the base of the first metatarsal: supports the transverse arch ("stirrup" with tibialis anterior).'],
    },
    'Plantar aponeurosis': {
      clinical: ['Plantar fasciitis: heel pain worst with the first steps in the morning.'],
      neet: ['Windlass mechanism: toe extension tightens the aponeurosis and raises the arch.'],
    },
    'Lateral meniscus': {
      clinical: ['Torn less often than the medial meniscus because it is more mobile.', 'Discoid lateral meniscus is a congenital variant that causes clicking in children.'],
      neet: ['Not attached to the fibular collateral ligament; popliteus tendon separates them.'],
    },
    'Saphenous nerve': {
      clinical: ['At risk when the great saphenous vein is stripped or harvested; numbness of the medial leg.'],
      neet: ['Longest cutaneous branch of the femoral nerve; the only femoral branch below the knee.'],
    },
    'Sural nerve': {
      clinical: ['Common site for nerve biopsy and a donor for nerve grafts.'],
      neet: ['Runs with the small saphenous vein behind the lateral malleolus; supplies the lateral foot.'],
    },
    'Deep fibular nerve': {
      clinical: ['Lesion gives foot drop with eversion preserved and numbness only in the first web space.'],
      neet: ['Accompanies the anterior tibial artery in the anterior compartment.'],
    },
    'Superficial fibular nerve': {
      clinical: ['Can be injured in ankle sprains and in lateral ankle portals for arthroscopy.'],
      neet: ['Supplies fibularis longus and brevis and most of the skin of the dorsum of the foot.'],
    },
    'Pudendal nerve': {
      supply: [{ label: 'Roots', text: 'S2–S4' }],
      clinical: ['Pudendal nerve block at the ischial spine is used for vaginal delivery.', 'Stretched in prolonged labour, contributing to incontinence.'],
      neet: ['Leaves through the greater sciatic foramen and re-enters through the lesser (with the internal pudendal vessels).'],
    },
    'Lateral femoral cutaneous nerve': {
      supply: [{ label: 'Roots', text: 'L2–L3' }],
      clinical: ['Meralgia paraesthetica: burning numbness of the lateral thigh from compression near the anterior superior iliac spine (tight belts, obesity, pregnancy).'],
      neet: ['Purely sensory; passes under or through the lateral inguinal ligament.'],
    },
    'Genitofemoral nerve': {
      supply: [{ label: 'Roots', text: 'L1–L2' }],
      clinical: ['Genital branch carries the efferent limb of the cremasteric reflex (afferent: femoral branch / ilio-inguinal).'],
      neet: ['Pierces psoas major and runs on its front surface.'],
    },
    'Ilio-inguinal nerve': {
      supply: [{ label: 'Roots', text: 'L1' }],
      clinical: ['Can be trapped during inguinal hernia repair, causing chronic groin pain.'],
      neet: ['Passes through the superficial inguinal ring but not the deep ring.'],
    },
  },
  'Head and neck': {
    Masseter: {
      supply: [{ label: 'Nerve', text: 'Masseteric nerve (mandibular division, V3)' }],
      clinical: ['Masseter hypertrophy from bruxism; trismus in tetanus begins with masseter spasm.'],
      neet: ['Muscles of mastication: masseter, temporalis, medial and lateral pterygoids (all V3).'],
    },
    'Temporalis muscle': {
      supply: [{ label: 'Nerve', text: 'Deep temporal nerves (V3)' }],
      clinical: ['Temporalis wasting suggests a V3 lesion or general muscle wasting.'],
      neet: ['Posterior fibres retract the mandible.'],
    },
    'Lateral pterygoid muscle': {
      supply: [{ label: 'Nerve', text: 'Nerve to lateral pterygoid (V3)' }],
      clinical: ['Jaw deviates towards the side of a V3 lesion on opening, because the healthy lateral pterygoid pushes it across.'],
      neet: ['The only muscle of mastication that opens the mouth (with gravity and suprahyoids).'],
    },
    'Medial pterygoid muscle': {
      supply: [{ label: 'Nerve', text: 'Nerve to medial pterygoid (V3)' }],
      clinical: ['Inferior alveolar nerve block is given in the pterygomandibular space, between this muscle and the ramus.'],
      neet: ['Forms a sling with masseter around the angle of the mandible.'],
    },
    'Orbicularis oculi': {
      supply: [{ label: 'Nerve', text: 'Temporal and zygomatic branches of the facial nerve' }],
      clinical: ['Weakness (Bell palsy) prevents eye closure: risk of corneal exposure; tape the eye shut at night.'],
      neet: ['Palpebral part closes the eye gently; orbital part closes it tightly.'],
    },
    'Orbicularis oris muscle': {
      supply: [{ label: 'Nerve', text: 'Buccal and marginal mandibular branches of the facial nerve' }],
      clinical: ['Drooling and difficulty whistling in facial nerve palsy.'],
      neet: ['Sphincter of the mouth.'],
    },
    Platysma: {
      supply: [{ label: 'Nerve', text: 'Cervical branch of the facial nerve' }],
      clinical: ['Neck wounds that breach the platysma are "penetrating" and need formal assessment.'],
      neet: ['Lies in the superficial fascia; the external jugular vein runs deep to it.'],
    },
    'Scalenus anterior muscle': {
      supply: [{ label: 'Nerve', text: 'C4–C6 ventral rami' }],
      clinical: ['Scalenus anticus syndrome compresses the subclavian artery and brachial plexus (thoracic outlet syndrome).', 'Landmark for interscalene block.'],
      neet: ['Subclavian vein passes in front of it; the subclavian artery and brachial plexus pass behind. The phrenic nerve runs down on its front.'],
    },
    'Lateral rectus muscle': {
      supply: [{ label: 'Nerve', text: 'Abducens nerve (VI)' }],
      clinical: ['Sixth nerve palsy: eye cannot abduct; horizontal diplopia worse looking to the affected side.'],
      neet: ['LR6 SO4, the rest III.'],
    },
    'Superior oblique muscle': {
      supply: [{ label: 'Nerve', text: 'Trochlear nerve (IV)' }],
      clinical: ['Fourth nerve palsy: vertical diplopia worse on looking down and in (reading, stairs).'],
      neet: ['Depresses the eye best when it is adducted; also intorts.'],
    },
    'Levator palpebrae superioris': {
      supply: [{ label: 'Nerve', text: 'Oculomotor nerve; smooth muscle part (Müller) by sympathetic fibres' }],
      clinical: ['Complete ptosis in third nerve palsy; partial ptosis in Horner syndrome.'],
      neet: ['Ptosis with miosis = Horner; ptosis with dilated pupil = third nerve palsy.'],
    },
    'Posterior crico-arytenoid muscle': {
      supply: [{ label: 'Nerve', text: 'Recurrent laryngeal nerve' }],
      clinical: ['Bilateral recurrent laryngeal nerve injury (thyroidectomy) can cause stridor needing tracheostomy.'],
      neet: ['The only abductor of the vocal cords: "safety muscle of the larynx".'],
    },
    'Cricothyroid muscle': {
      supply: [{ label: 'Nerve', text: 'External branch of the superior laryngeal nerve' }],
      clinical: ['External laryngeal nerve injury (near the superior thyroid artery) causes a weak, monotonous voice and loss of high pitch.'],
      neet: ['The only intrinsic laryngeal muscle not supplied by the recurrent laryngeal nerve.'],
    },
    'Anterior belly of digastric muscle': {
      supply: [{ label: 'Nerve', text: 'Nerve to mylohyoid (V3); posterior belly by the facial nerve' }],
      clinical: ['Landmark for the submandibular triangle in neck dissections.'],
      neet: ['Two bellies from different pharyngeal arches: first (anterior) and second (posterior).'],
    },
    Tongue: {
      supply: [
        { label: 'Motor', text: 'Hypoglossal nerve (all except palatoglossus: vagus)' },
        { label: 'Sensory', text: 'Anterior two-thirds: lingual nerve (V3), taste by chorda tympani (VII); posterior third: glossopharyngeal' },
      ],
      clinical: ['Tongue cancer usually arises on the lateral border; spreads to the submandibular and deep cervical nodes.', 'Falls back and obstructs the airway in unconscious patients: jaw thrust and airway adjuncts.'],
      neet: ['Genioglossus pulls the tongue forwards; if paralysed under anaesthesia, the airway can obstruct.'],
    },
    'Palatine tonsil': {
      clinical: ['Peritonsillar abscess (quinsy): uvula pushed to the opposite side, trismus.', 'Pain from tonsillitis or after tonsillectomy is referred to the ear (glossopharyngeal nerve).'],
      neet: ['Main blood supply is the tonsillar branch of the facial artery; bleeding after tonsillectomy is often from the external palatine (paratonsillar) vein.'],
    },
    'Submandibular gland': {
      clinical: ['Most salivary stones occur here because its secretion is thick and the duct runs upwards.'],
      neet: ['Wharton duct opens at the sublingual papilla; the lingual nerve loops under the duct.'],
    },
    'Lingual nerve': {
      clinical: ['Can be injured in removal of an impacted lower third molar: numb tongue and loss of taste over the anterior two-thirds.'],
      neet: ['Carries chorda tympani fibres (taste and secretomotor to submandibular and sublingual glands).'],
    },
    'Inferior alveolar nerve': {
      clinical: ['Inferior alveolar nerve block anaesthetises the lower teeth and lower lip on that side.'],
      neet: ['Enters the mandibular foramen; continues as the mental nerve at the mental foramen.'],
    },
    'Chorda tympani': {
      clinical: ['Injury in middle ear surgery causes loss of taste over the anterior two-thirds of the tongue.'],
      neet: ['Branch of the facial nerve crossing the tympanic membrane; joins the lingual nerve.'],
    },
    'Vestibulocochlear nerve (VIII)': {
      clinical: ['Vestibular schwannoma (acoustic neuroma) at the cerebellopontine angle: unilateral sensorineural hearing loss, tinnitus.'],
      neet: ['Rinne and Weber tests separate conductive from sensorineural hearing loss.'],
    },
    'Olfactory nerve (I)': {
      clinical: ['Anosmia after head injury from tearing of the olfactory fibres at the cribriform plate; CSF rhinorrhoea can occur.'],
      neet: ['The only sensory pathway that does not relay in the thalamus before the cortex.'],
    },
    'Facial artery': {
      clinical: ['Pulse felt at the anterior border of masseter on the lower border of the mandible.'],
      neet: ['Tortuous course allows movement of the face; anastomoses with the ophthalmic artery at the medial angle of the eye ("danger area").'],
    },
    'Anterior cerebral artery': {
      clinical: ['Occlusion: contralateral weakness and sensory loss of the leg more than the arm; urinary incontinence.'],
      neet: ['Linked across the midline by the anterior communicating artery, the commonest site of berry aneurysm.'],
    },
    'Posterior cerebral artery': {
      clinical: ['Occlusion causes contralateral homonymous hemianopia with macular sparing.'],
      neet: ['Terminal branch of the basilar artery; supplies the occipital lobe.'],
    },
    'Superior sagittal sinus': {
      clinical: ['Cerebral venous sinus thrombosis (pregnancy, puerperium, dehydration): headache, seizures, raised pressure.'],
      neet: ['Arachnoid granulations drain CSF into it.'],
      imaging: '"Empty delta sign" on contrast CT in sinus thrombosis.',
    },
    'Lateral ventricle': {
      clinical: ['Dilated in hydrocephalus; an external ventricular drain is placed into the frontal horn through Kocher point.'],
      neet: ['CSF made by the choroid plexus flows lateral ventricles → interventricular foramen → third ventricle → aqueduct → fourth ventricle.'],
    },
    'Fourth ventricle': {
      clinical: ['Obstruction of its outlets (Dandy–Walker, posterior fossa tumours) causes hydrocephalus.'],
      neet: ['Drains through the median foramen (Magendie) and two lateral foramina (Luschka) into the subarachnoid space.'],
    },
    'Caudate nucleus': {
      clinical: ['Atrophy of the caudate nucleus in Huntington disease gives box-shaped lateral ventricles on imaging.'],
      neet: ['Caudate and putamen form the striatum.'],
    },
    'Lentiform nucleus': {
      clinical: ['Putamen is the commonest site of hypertensive intracerebral haemorrhage (lenticulostriate arteries).'],
      neet: ['Lentiform nucleus = putamen + globus pallidus; lies lateral to the internal capsule.'],
    },
    Adenohypophysis: {
      clinical: ['Pituitary apoplexy: sudden headache, visual loss and ophthalmoplegia from haemorrhage into an adenoma.', 'Sheehan syndrome: pituitary infarction after postpartum haemorrhage; failure of lactation is an early sign.'],
      neet: ['Prolactinoma is the commonest functioning pituitary tumour.'],
    },
    'Atlas (C1)': {
      clinical: ['Jefferson fracture: burst fracture of the ring of C1 from axial loading (diving).'],
      neet: ['Has no body and no spinous process; the dens of C2 represents its body.'],
    },
    'Axis (C2)': {
      clinical: ['Odontoid (dens) fractures in the elderly after falls; hangman fracture of the pars in hyperextension.'],
      neet: ['Atlanto-axial joint allows about half of neck rotation.'],
    },
    'Vertebra C7': {
      clinical: ['Vertebra prominens: the first easily felt spinous process when counting down the neck.'],
      neet: ['Its foramen transversarium usually transmits only the vertebral vein, not the artery.'],
    },
    'Hyoid bone': {
      clinical: ['Fracture of the hyoid suggests manual strangulation in forensic practice.', 'Thyroglossal cyst moves up on protruding the tongue because of its link to the hyoid.'],
      neet: ['Does not articulate with any other bone; lies at the C3 level.'],
    },
    'Thyroid cartilage': {
      clinical: ['Laryngeal prominence (Adam\'s apple) is more marked in men.', 'External laryngeal pressure on it improves the view during intubation.'],
      neet: ['Vocal cords attach to the inner surface of the thyroid angle.'],
    },
    'Tympanic membrane': {
      clinical: ['Acute otitis media: red, bulging drum; perforation relieves the pain.', 'Myringotomy is done in the posteroinferior quadrant to avoid the ossicles and chorda tympani.'],
      neet: ['Cone of light points anteroinferiorly; outer surface supplied by the auriculotemporal nerve and vagus (Arnold nerve: cough reflex on ear cleaning).'],
    },
  },
  'Back and spine': {
    'Vertebra T12': {
      clinical: ['Thoracolumbar junction (T12–L1) is the commonest site of spinal fracture.'],
      neet: ['Transitional vertebra between thoracic and lumbar; the 12th rib attaches to it.'],
    },
    'Anterior longitudinal ligament': {
      clinical: ['Torn in hyperextension (whiplash) injuries; ossified in diffuse idiopathic skeletal hyperostosis (DISH).'],
      neet: ['Broader and stronger than the posterior ligament; prevents hyperextension.'],
    },
    'Posterior longitudinal ligament': {
      clinical: ['Narrower in the lumbar region, so disc herniations are usually posterolateral and hit the traversing nerve root.', 'Ossification of the posterior longitudinal ligament (OPLL) causes cervical myelopathy.'],
      neet: ['L4–L5 posterolateral disc herniation compresses the L5 root.'],
    },
    'Iliocostalis lumborum muscle': {
      supply: [{ label: 'Nerve', text: 'Dorsal rami of spinal nerves' }],
      clinical: ['Erector spinae spasm is a common cause of mechanical low back pain.'],
      neet: ['Erector spinae from lateral to medial: iliocostalis, longissimus, spinalis ("I Love Spine").'],
    },
    'Posterior sacro-iliac ligament': {
      clinical: ['Sacro-iliac joint pain is felt over the posterior superior iliac spine (dimple of Venus).', 'Sacroiliitis is an early feature of ankylosing spondylitis.'],
      neet: ['The sacro-iliac joint is synovial in front and fibrous behind.'],
    },
  },
};
