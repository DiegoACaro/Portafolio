"use client";

/*
Tipos (GLTFResult) auto-generados por gltfjsx 6.5.3  (npx gltfjsx public/pcb.glb --types).
Refactor: materiales realistas de PCB + asignacion de material por nombre de nodo.
*/

import * as THREE from 'three'
import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

export type GLTFResult = GLTF & {
  nodes: {
    ['Boardstep-1Open_CASCADE_STEP_translator_68_111step-1']: THREE.Mesh
    ['T2step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_K_X_F6rper_1step-1']: THREE.Mesh
    ['T2step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_Beschriftung_1step-1']: THREE.Mesh
    ['T2step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_Pins_1step-1']: THREE.Mesh
    ['T2step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_Pins_1step-3']: THREE.Mesh
    ['T2step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_Pins_1step-2']: THREE.Mesh
    mesh_6: THREE.Mesh
    mesh_6_1: THREE.Mesh
    mesh_7: THREE.Mesh
    mesh_7_1: THREE.Mesh
    ['U10step-15964209136step-1Bodystep-1Open_CASCADE_STEP_translator_68_121step-1']: THREE.Mesh
    ['U10step-15964209136step-1Leaderstep-3']: THREE.Mesh
    ['U10step-15964209136step-1Leaderstep-2']: THREE.Mesh
    ['U10step-15964209136step-1Leaderstep-4']: THREE.Mesh
    ['U10step-15964209136step-1Open_CASCADE_STEP_translator_68_11step-1']: THREE.Mesh
    ['U10step-15964209136step-1Leaderstep-1']: THREE.Mesh
    mesh_14: THREE.Mesh
    mesh_14_1: THREE.Mesh
    ['R37step-15954929472step-1Terminalstep-2Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R37step-15954929472step-1Terminalstep-1Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R37step-15954929472step-1Mid_Bodystep-1']: THREE.Mesh
    ['R37step-15954929472step-1Markstep-1']: THREE.Mesh
    ['R36step-15954929472step-1Terminalstep-2Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R36step-15954929472step-1Terminalstep-1Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R36step-15954929472step-1Mid_Bodystep-1']: THREE.Mesh
    ['R36step-15954929472step-1Markstep-1']: THREE.Mesh
    ['R13step-15954929472step-1Terminalstep-2Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R13step-15954929472step-1Terminalstep-1Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R13step-15954929472step-1Mid_Bodystep-1']: THREE.Mesh
    ['R13step-15954929472step-1Markstep-1']: THREE.Mesh
    ['T1step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_K_X_F6rper_1step-1']: THREE.Mesh
    ['T1step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_Beschriftung_1step-1']: THREE.Mesh
    ['T1step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_Pins_1step-1']: THREE.Mesh
    ['T1step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_Pins_1step-3']: THREE.Mesh
    ['T1step-1User_Library-SOT323_(SC70-3)-1step-1User_Library-SOT323_(SC70-3)-1_Pins_1step-2']: THREE.Mesh
    ['R5step-15838239104step-1Terminal-1step-2Open_CASCADE_STEP_translator_68_2521-0step-1']: THREE.Mesh
    ['R5step-15838239104step-1Terminal-1step-1Open_CASCADE_STEP_translator_68_2521-0step-1']: THREE.Mesh
    ['R5step-15838239104step-1Mid_Body-1step-1']: THREE.Mesh
    ['R5step-15838239104step-1Mark-2step-1']: THREE.Mesh
    ['R6step-15954929472step-1Terminalstep-2Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R6step-15954929472step-1Terminalstep-1Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R6step-15954929472step-1Mid_Bodystep-1']: THREE.Mesh
    ['R6step-15954929472step-1Markstep-1']: THREE.Mesh
    mesh_40: THREE.Mesh
    mesh_40_1: THREE.Mesh
    mesh_41: THREE.Mesh
    mesh_41_1: THREE.Mesh
    ['U1step-15954929312step-1Body-1step-1Open_CASCADE_STEP_translator_68_2611step-1']: THREE.Mesh
    ['U1step-15954929312step-1Leader-3step-2']: THREE.Mesh
    ['U1step-15954929312step-1Leader-3step-6']: THREE.Mesh
    ['U1step-15954929312step-1Leader-3step-1']: THREE.Mesh
    ['U1step-15954929312step-1Leader-3step-3']: THREE.Mesh
    ['U1step-15954929312step-1Leader-3step-4']: THREE.Mesh
    ['U1step-15954929312step-1Leader-3step-5']: THREE.Mesh
    ['P12step-1B3B-XH-A_RGB16777215step-1']: THREE.Mesh
    ['R27step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R27step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R27step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R27step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R26step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R26step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R26step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R26step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R33step-15954929472step-1Terminalstep-2Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R33step-15954929472step-1Terminalstep-1Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R33step-15954929472step-1Mid_Bodystep-1']: THREE.Mesh
    ['R33step-15954929472step-1Markstep-1']: THREE.Mesh
    ['R34step-15838239104step-1Terminal-1step-2Open_CASCADE_STEP_translator_68_2521-0step-1']: THREE.Mesh
    ['R34step-15838239104step-1Terminal-1step-1Open_CASCADE_STEP_translator_68_2521-0step-1']: THREE.Mesh
    ['R34step-15838239104step-1Mid_Body-1step-1']: THREE.Mesh
    ['R34step-15838239104step-1Mark-2step-1']: THREE.Mesh
    ['R25step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R25step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R25step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R25step-15954929792step-1Mark-6step-1']: THREE.Mesh
    mesh_70: THREE.Mesh
    mesh_70_1: THREE.Mesh
    ['R35step-15838239104step-1Terminal-1step-2Open_CASCADE_STEP_translator_68_2521-0step-1']: THREE.Mesh
    ['R35step-15838239104step-1Terminal-1step-1Open_CASCADE_STEP_translator_68_2521-0step-1']: THREE.Mesh
    ['R35step-15838239104step-1Mid_Body-1step-1']: THREE.Mesh
    ['R35step-15838239104step-1Mark-2step-1']: THREE.Mesh
    ['R32step-15954929472step-1Terminalstep-2Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R32step-15954929472step-1Terminalstep-1Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R32step-15954929472step-1Mid_Bodystep-1']: THREE.Mesh
    ['R32step-15954929472step-1Markstep-1']: THREE.Mesh
    ['R30step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R30step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R30step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R30step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R24step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R24step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R24step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R24step-15954929552step-1Mark-9step-1']: THREE.Mesh
    mesh_87: THREE.Mesh
    mesh_87_1: THREE.Mesh
    mesh_88: THREE.Mesh
    mesh_88_1: THREE.Mesh
    ['R31step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R31step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R31step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R31step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R22step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R22step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R22step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R22step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R17step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R17step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R17step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R17step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R15step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R15step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R15step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R15step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R19step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R19step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R19step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R19step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R28step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R28step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R28step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R28step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R23step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R23step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R23step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R23step-15954929552step-1Mark-9step-1']: THREE.Mesh
    mesh_117: THREE.Mesh
    mesh_117_1: THREE.Mesh
    mesh_117_2: THREE.Mesh
    ['R21step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R21step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R21step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R21step-15954929552step-1Mark-9step-1']: THREE.Mesh
    mesh_122: THREE.Mesh
    mesh_122_1: THREE.Mesh
    mesh_122_2: THREE.Mesh
    ['R20step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R20step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R20step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R20step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R29step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R29step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R29step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R29step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R18step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R18step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R18step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R18step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R16step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R16step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R16step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R16step-15954929792step-1Mark-6step-1']: THREE.Mesh
    mesh_139: THREE.Mesh
    mesh_139_1: THREE.Mesh
    mesh_140: THREE.Mesh
    mesh_140_1: THREE.Mesh
    ['R7step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R7step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R7step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R7step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R9step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R9step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R9step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R9step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R4step-15954929472step-1Terminalstep-2Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R4step-15954929472step-1Terminalstep-1Open_CASCADE_STEP_translator_68_2521step-1']: THREE.Mesh
    ['R4step-15954929472step-1Mid_Bodystep-1']: THREE.Mesh
    ['R4step-15954929472step-1Markstep-1']: THREE.Mesh
    ['P8step-1B4B-XH-A_RGB16777215step-1']: THREE.Mesh
    ['R8step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R8step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R8step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R8step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R11step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R11step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R11step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R11step-15954929792step-1Mark-6step-1']: THREE.Mesh
    ['R2step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R2step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R2step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R2step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R10step-15954929552step-1Terminal-3step-2Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R10step-15954929552step-1Terminal-3step-1Open_CASCADE_STEP_translator_68_2521-7step-1']: THREE.Mesh
    ['R10step-15954929552step-1Mid_Body-8step-1']: THREE.Mesh
    ['R10step-15954929552step-1Mark-9step-1']: THREE.Mesh
    ['R1step-15954929792step-1Terminal-2step-2Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R1step-15954929792step-1Terminal-2step-1Open_CASCADE_STEP_translator_68_2521-4step-1']: THREE.Mesh
    ['R1step-15954929792step-1Mid_Body-5step-1']: THREE.Mesh
    ['R1step-15954929792step-1Mark-6step-1']: THREE.Mesh
    mesh_174: THREE.Mesh
    mesh_174_1: THREE.Mesh
    mesh_174_2: THREE.Mesh
    mesh_175: THREE.Mesh
    mesh_175_1: THREE.Mesh
    mesh_176: THREE.Mesh
    mesh_176_1: THREE.Mesh
    mesh_176_2: THREE.Mesh
    ['P10step-1B4B-XH-A_RGB16777215step-1']: THREE.Mesh
    ['P9step-1B4B-XH-A_RGB16777215step-1']: THREE.Mesh
    ['P5step-1B2B-XH-A_RGB16777215step-1']: THREE.Mesh
    ['P2step-1B2B-XH-A_RGB16777215step-1']: THREE.Mesh
    mesh_181: THREE.Mesh
    mesh_181_1: THREE.Mesh
    ['P3step-1B2B-XH-A_RGB16777215step-1']: THREE.Mesh
    ['P7step-1B4B-XH-A_RGB16777215step-1']: THREE.Mesh
    mesh_184: THREE.Mesh
    mesh_184_1: THREE.Mesh
    mesh_184_2: THREE.Mesh
    mesh_185: THREE.Mesh
    mesh_185_1: THREE.Mesh
    mesh_186: THREE.Mesh
    mesh_186_1: THREE.Mesh
    mesh_186_2: THREE.Mesh
    mesh_186_3: THREE.Mesh
    mesh_187: THREE.Mesh
    mesh_187_1: THREE.Mesh
    mesh_187_2: THREE.Mesh
    mesh_187_3: THREE.Mesh
    ['P1step-1B2B-XH-A_RGB16777215step-1']: THREE.Mesh
    ['P6step-1B2B-XH-A_RGB16777215step-1']: THREE.Mesh
    mesh_190: THREE.Mesh
    mesh_190_1: THREE.Mesh
    mesh_190_2: THREE.Mesh
    mesh_191: THREE.Mesh
    mesh_191_1: THREE.Mesh
    mesh_191_2: THREE.Mesh
    mesh_192: THREE.Mesh
    mesh_192_1: THREE.Mesh
    mesh_192_2: THREE.Mesh
    ['F1step-1Mini_Blade_Fuse_Holderstep-1Fuse_Holderstep-1Body-10step-1']: THREE.Mesh
    ['F1step-1Mini_Blade_Fuse_Holderstep-1Fuse_Holderstep-1Pinsstep-1']: THREE.Mesh
    mesh_195: THREE.Mesh
    mesh_195_1: THREE.Mesh
    mesh_196: THREE.Mesh
    mesh_196_1: THREE.Mesh
    mesh_196_2: THREE.Mesh
    mesh_196_3: THREE.Mesh
    mesh_197: THREE.Mesh
    mesh_197_1: THREE.Mesh
    mesh_197_2: THREE.Mesh
    mesh_197_3: THREE.Mesh
    mesh_198: THREE.Mesh
    mesh_198_1: THREE.Mesh
    mesh_198_2: THREE.Mesh
    mesh_199: THREE.Mesh
    mesh_199_1: THREE.Mesh
    mesh_199_2: THREE.Mesh
    mesh_199_3: THREE.Mesh
    ['C75step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C75step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C75step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C58step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C58step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C74step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C74step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C74step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C88step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C88step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C84step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C84step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C73step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C73step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C73step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    mesh_215: THREE.Mesh
    mesh_215_1: THREE.Mesh
    mesh_215_2: THREE.Mesh
    mesh_215_3: THREE.Mesh
    ['C89step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C89step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C85step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C85step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C72step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C72step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C72step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C54step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C54step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    mesh_225: THREE.Mesh
    mesh_225_1: THREE.Mesh
    mesh_225_2: THREE.Mesh
    mesh_225_3: THREE.Mesh
    ['C45step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C45step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C45step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C44step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C44step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C44step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C43step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C43step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C43step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['F2step-1Mini_Blade_Fuse_Holderstep-1Fuse_Holderstep-1Body-10step-1']: THREE.Mesh
    ['F2step-1Mini_Blade_Fuse_Holderstep-1Fuse_Holderstep-1Pinsstep-1']: THREE.Mesh
    mesh_235: THREE.Mesh
    mesh_235_1: THREE.Mesh
    ['C25step-15954929152step-1Mid_Body-11step-1Open_CASCADE_STEP_translator_68_2121step-1']: THREE.Mesh
    ['C25step-15954929152step-1Terminal-4step-1Open_CASCADE_STEP_translator_68_2111step-1']: THREE.Mesh
    ['C25step-15954929152step-1Terminal-4step-1Open_CASCADE_STEP_translator_68_2112step-1']: THREE.Mesh
    ['C59step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C59step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    mesh_243: THREE.Mesh
    mesh_243_1: THREE.Mesh
    ['C17step-15954929152step-1Mid_Body-11step-1Open_CASCADE_STEP_translator_68_2121step-1']: THREE.Mesh
    ['C17step-15954929152step-1Terminal-4step-1Open_CASCADE_STEP_translator_68_2111step-1']: THREE.Mesh
    ['C17step-15954929152step-1Terminal-4step-1Open_CASCADE_STEP_translator_68_2112step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-6Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-8Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-4Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-5Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-1Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-2Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Body-2step-1Open_CASCADE_STEP_translator_68_121-16step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-3Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-7Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-16Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-18Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-13Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-9Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-15Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-10Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-11Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-12Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-14Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-17Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-27Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-28Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-20Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-21Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-24Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-22Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-19Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-23Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-26Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Pin_Shapestep-25Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U7step-15954929072step-1Thermal_Shapestep-1']: THREE.Mesh
    ['U7step-15954929072step-1Open_CASCADE_STEP_translator_68_11-17step-1']: THREE.Mesh
    mesh_278: THREE.Mesh
    mesh_278_1: THREE.Mesh
    mesh_279: THREE.Mesh
    mesh_279_1: THREE.Mesh
    ['C23step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C23step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C23step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['L1step-15962580000step-1Extrudedstep-1']: THREE.Mesh
    mesh_284: THREE.Mesh
    mesh_284_1: THREE.Mesh
    mesh_285: THREE.Mesh
    mesh_285_1: THREE.Mesh
    mesh_285_2: THREE.Mesh
    mesh_285_3: THREE.Mesh
    ['C22step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C22step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C22step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C55step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C55step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-6Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-8Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-4Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-5Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-1Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-2Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Body-2step-1Open_CASCADE_STEP_translator_68_121-16step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-3Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-7Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-16Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-18Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-13Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-9Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-15Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-10Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-11Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-12Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-14Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-17Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-27Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-28Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-20Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-21Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-24Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-22Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-19Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-23Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-26Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Pin_Shapestep-25Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U9step-15954929072step-1Thermal_Shapestep-1']: THREE.Mesh
    ['U9step-15954929072step-1Open_CASCADE_STEP_translator_68_11-17step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-6Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-8Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-4Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-5Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-1Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-2Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Body-2step-1Open_CASCADE_STEP_translator_68_121-16step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-3Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-7Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-16Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-18Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-13Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-9Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-15Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-10Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-11Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-12Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-14Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-17Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-27Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-28Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-20Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-21Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-24Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-22Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-19Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-23Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-26Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Pin_Shapestep-25Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U8step-15954929072step-1Thermal_Shapestep-1']: THREE.Mesh
    ['U8step-15954929072step-1Open_CASCADE_STEP_translator_68_11-17step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-6Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-8Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-4Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-5Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-1Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-2Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Body-2step-1Open_CASCADE_STEP_translator_68_121-16step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-3Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-7Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-16Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-18Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-13Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-9Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-15Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-10Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-11Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-12Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-14Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-17Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-27Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-28Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-20Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-21Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-24Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-22Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-19Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-23Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-26Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Pin_Shapestep-25Open_CASCADE_STEP_translator_68_141step-1']: THREE.Mesh
    ['U6step-15954929072step-1Thermal_Shapestep-1']: THREE.Mesh
    ['U6step-15954929072step-1Open_CASCADE_STEP_translator_68_11-17step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-1Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Body-3step-1Open_CASCADE_STEP_translator_68_1821step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-11Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-12Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-3Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-2Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-5Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-6Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-4Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-8Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-9Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-7Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-10Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-14Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Pin_Shape-1step-13Open_CASCADE_STEP_translator_68_1841step-1']: THREE.Mesh
    ['U4step-15954928992step-1Open_CASCADE_STEP_translator_68_181step-1']: THREE.Mesh
    ['U4step-15954928992step-1Thermal_Shape-18step-1']: THREE.Mesh
    mesh_401: THREE.Mesh
    mesh_401_1: THREE.Mesh
    mesh_401_2: THREE.Mesh
    mesh_402: THREE.Mesh
    mesh_402_1: THREE.Mesh
    mesh_402_2: THREE.Mesh
    mesh_403: THREE.Mesh
    mesh_403_1: THREE.Mesh
    mesh_403_2: THREE.Mesh
    mesh_404: THREE.Mesh
    mesh_404_1: THREE.Mesh
    mesh_404_2: THREE.Mesh
    mesh_405: THREE.Mesh
    mesh_405_1: THREE.Mesh
    mesh_405_2: THREE.Mesh
    mesh_406: THREE.Mesh
    mesh_406_1: THREE.Mesh
    mesh_406_2: THREE.Mesh
    mesh_406_3: THREE.Mesh
    ['U2step-15954928912step-1Body-4step-1Open_CASCADE_STEP_translator_68_111step-1']: THREE.Mesh
    ['U2step-15954928912step-1Leadstep-2']: THREE.Mesh
    ['U2step-15954928912step-1Leadstep-1']: THREE.Mesh
    ['U2step-15954928912step-1Tabstep-1']: THREE.Mesh
    ['U2step-15954928912step-1Leadstep-3']: THREE.Mesh
    mesh_412: THREE.Mesh
    mesh_412_1: THREE.Mesh
    mesh_412_2: THREE.Mesh
    mesh_413: THREE.Mesh
    mesh_413_1: THREE.Mesh
    mesh_413_2: THREE.Mesh
    ['C24step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C24step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C38step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C38step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C38step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C16step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C16step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C16step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C15step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C15step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C32step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C32step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C32step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C42step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C42step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C42step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C40step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C40step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C40step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C34step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C34step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C36step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C36step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C21step-15954929712step-1Terminal-6step-1Open_CASCADE_STEP_translator_68_2111-19step-1']: THREE.Mesh
    ['C21step-15954929712step-1Terminal-6step-1Open_CASCADE_STEP_translator_68_2112-20step-1']: THREE.Mesh
    ['C21step-15954929712step-1Mid_Body-2step-1Open_CASCADE_STEP_translator_68_2121-21step-1']: THREE.Mesh
    ['C19step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C19step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C19step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C20step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C20step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C18step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C18step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C18step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C13step-15954929152step-1Mid_Body-11step-1Open_CASCADE_STEP_translator_68_2121step-1']: THREE.Mesh
    ['C13step-15954929152step-1Terminal-4step-1Open_CASCADE_STEP_translator_68_2111step-1']: THREE.Mesh
    ['C13step-15954929152step-1Terminal-4step-1Open_CASCADE_STEP_translator_68_2112step-1']: THREE.Mesh
    mesh_451: THREE.Mesh
    mesh_451_1: THREE.Mesh
    mesh_452: THREE.Mesh
    mesh_452_1: THREE.Mesh
    ['C4step-15954929712step-1Terminal-6step-1Open_CASCADE_STEP_translator_68_2111-19step-1']: THREE.Mesh
    ['C4step-15954929712step-1Terminal-6step-1Open_CASCADE_STEP_translator_68_2112-20step-1']: THREE.Mesh
    ['C4step-15954929712step-1Mid_Body-2step-1Open_CASCADE_STEP_translator_68_2121-21step-1']: THREE.Mesh
    ['C1step-15964124224step-1Mid_Body-3step-1Open_CASCADE_STEP_translator_68_2121-24step-1']: THREE.Mesh
    ['C1step-15964124224step-1Terminal-7step-1Open_CASCADE_STEP_translator_68_2111-22step-1']: THREE.Mesh
    ['C1step-15964124224step-1Terminal-7step-1Open_CASCADE_STEP_translator_68_2112-23step-1']: THREE.Mesh
    mesh_459: THREE.Mesh
    mesh_459_1: THREE.Mesh
    ['C12step-15954929632step-1Mid_Body-1-14step-1Open_CASCADE_STEP_translator_68_2121-15step-1']: THREE.Mesh
    ['C12step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2112-13step-1']: THREE.Mesh
    ['C12step-15954929632step-1Terminal-5step-1Open_CASCADE_STEP_translator_68_2111-12step-1']: THREE.Mesh
    ['C8step-1V0603HDstep-1User_Library-V0603HD_K_X_F6rper_1step-1']: THREE.Mesh
    ['C8step-1V0603HDstep-1User_Library-V0603HD_Anschl_X_FCsse_1step-1']: THREE.Mesh
    ['C14step-15954929152step-1Mid_Body-11step-1Open_CASCADE_STEP_translator_68_2121step-1']: THREE.Mesh
    ['C14step-15954929152step-1Terminal-4step-1Open_CASCADE_STEP_translator_68_2111step-1']: THREE.Mesh
    ['C14step-15954929152step-1Terminal-4step-1Open_CASCADE_STEP_translator_68_2112step-1']: THREE.Mesh
    mesh_468: THREE.Mesh
    mesh_468_1: THREE.Mesh
    mesh_469: THREE.Mesh
    mesh_469_1: THREE.Mesh
    mesh_470: THREE.Mesh
    mesh_470_1: THREE.Mesh
    mesh_471: THREE.Mesh
    mesh_471_1: THREE.Mesh
    mesh_471_2: THREE.Mesh
    mesh_472: THREE.Mesh
    mesh_472_1: THREE.Mesh
  }
  materials: {
    defaultplastic: THREE.MeshStandardMaterial
  }
}

/* ========================================================================== *
 *  MATERIALES REALISTAS DE PCB
 *  Objeto centralizado (singletons): 5 materiales reutilizados por las ~560
 *  mallas del modelo. Se crean una sola vez a nivel de modulo.
 * ========================================================================== */
export const PCB_MATERIALS = {
  /** Sustrato FR4 / mascara de soldadura (verde oscuro). */
  board: new THREE.MeshStandardMaterial({
    name: "pcb/board",
    color: "#252525",
    roughness: 0.3,
    metalness: 0.1,
  }),
  /** Epoxi negro: cuerpos de IC, resistencias, transistores, inductores. */
  icBody: new THREE.MeshStandardMaterial({
    name: "pcb/ic-body",
    color: "#1a1a1a",
    roughness: 0.6,
    metalness: 0.05,
  }),
  /** Metal: pines, terminales, contactos, tabs, pads termicos, soldadura. */
  metalPins: new THREE.MeshStandardMaterial({
    name: "pcb/metal-pins",
    color: "#d6d6d6",
    roughness: 0.25,
    metalness: 0.95,
  }),
  /** Serigrafia: marcas de texto y referencias impresas (blanco). */
  silkscreen: new THREE.MeshStandardMaterial({
    name: "pcb/silkscreen",
    color: "#f0f0f0",
    roughness: 0.8,
    metalness: 0.0,
  }),
  /** Plastico marfil: conectores JST (B*B-XH-A) y portafusibles. */
  connectorPlastic: new THREE.MeshStandardMaterial({
    name: "pcb/connector-plastic",
    color: "#e5e5dc",
    roughness: 0.4,
    metalness: 0.0,
  }),
} as const;

export type PCBMaterialKey = keyof typeof PCB_MATERIALS;

/* ========================================================================== *
 *  ASIGNACION DE MATERIAL POR NOMBRE DE NODO
 *
 *  Los nombres provienen del STEP/CAD (SolidWorks -> glb). Reglas, por orden
 *  de prioridad:
 *    "...Board..."                                  -> board
 *    "...Beschriftung...", "...Mark..."             -> silkscreen
 *    "...Pin(s)...", "...Pin_Shape...", "...Terminal...",
 *    "...Metal...", "...Lead(er)...", "...Tab...",
 *    "...Thermal...", "...Anschluesse..."           -> metalPins
 *    "...B2B/B3B/B4B-XH-A...", "...Fuse...", "...Holder..." -> connectorPlastic
 *    "..._K_X_F6rper..." (Koerper), "...Mid_Body...", "...Body..." -> icBody
 *    mesh_42 / mesh_42_1  (mallas partidas por gltfjsx): base -> icBody,
 *                          sufijo numerico -> metalPins
 *    (resto)                                         -> icBody
 * ========================================================================== */
export function pickPCBMaterial(nodeName: string): THREE.MeshStandardMaterial {
  const n = nodeName.toLowerCase();

  // 1 · Sustrato de la placa
  if (n.includes("board")) return PCB_MATERIALS.board;

  // 2 · Serigrafia (texto / referencias)
  if (n.includes("beschriftung") || n.includes("mark")) {
    return PCB_MATERIALS.silkscreen;
  }

  // 3 · Metal: pines, terminales, leads, tabs, pads termicos, "Anschluesse"
  if (/pin|terminal|metal|lead|tab|thermal|anschl|contact|solder/.test(n)) {
    return PCB_MATERIALS.metalPins;
  }

  // 4 · Plastico de conectores JST y portafusibles
  if (/b[234]b-xh-a|fuse|holder|connector/.test(n)) {
    return PCB_MATERIALS.connectorPlastic;
  }

  // 5 · Cuerpos de epoxi (IC, resistencias SMD, transistores)
  if (/körper|f6rper|body/.test(n)) return PCB_MATERIALS.icBody;

  // 6 · Mallas partidas por gltfjsx (mesh_42 / mesh_42_1 / mesh_42_2 …)
  if (/^mesh_\d+_\d+$/.test(n)) return PCB_MATERIALS.metalPins;
  if (/^mesh_\d+$/.test(n)) return PCB_MATERIALS.icBody;

  // 7 · Por defecto: cuerpo oscuro
  return PCB_MATERIALS.icBody;
}

/**
 * Componentes presentes en el modelo (referencia; no afecta al render):
 *   Placa          Board
 *   ICs            U1, U2, U4, U6-U10
 *   Transistores   T1, T2  (SOT-323)
 *   Resistencias   R1-R37  (0603)
 *   Condensadores  C1-C89  (0603 / tantalio, huella V0603HD)
 *   Inductor       L1
 *   Fusibles       F1, F2  (Mini Blade Fuse Holder)
 *   Conectores     P1-P12  (JST B2B / B3B / B4B-XH-A)
 */

/* ========================================================================== *
 *  COMPONENTE
 *  Se descarta el JSX mesh-a-mesh que genera gltfjsx (560 mallas): el grafo
 *  del glb ya agrupa y transforma cada componente por su nombre de nodo, asi
 *  que se renderiza tal cual con <primitive> y solo se re-materializa por
 *  nombre. Esto es 1/25 del codigo y trivial de mantener.
 *  `GLTFResult` (arriba) se conserva intacto como tipado/documentacion.
 * ========================================================================== */

export function PCBModel(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/pcb.glb");

  const model = useMemo(() => {
    // Clon del grafo: permite instanciar el modelo sin pisar el cache de
    // useGLTF y deja mutar materiales / sombras con seguridad.
    const root = SkeletonUtils.clone(scene) as THREE.Group;

    const orphanCameras: THREE.Object3D[] = [];
    root.traverse((o) => {
      // Las "vistas guardadas" del CAD llegan como camaras huerfanas: fuera.
      if ((o as THREE.Camera).isCamera) {
        orphanCameras.push(o);
        return;
      }
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = pickPCBMaterial(mesh.name);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    orphanCameras.forEach((c) => c.removeFromParent());

    return root;
  }, [scene]);

  return <primitive object={model} {...props} dispose={null} />;
}

useGLTF.preload("/pcb.glb");
