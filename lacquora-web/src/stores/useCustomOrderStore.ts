import { defineStore } from 'pinia'
import type { CustomOrder, BodyShape, WoodMaterial, CraftOption, HardwareConfig } from '@/types'

const DEFAULT_HARDWARE: HardwareConfig = {
  bridge: '',
  pickups: '',
  neck: '',
  fretboard: '',
}

export const useCustomOrderStore = defineStore('customOrder', () => {
  const currentStep = ref(1)
  const totalSteps = 6

  const order = ref<Partial<CustomOrder>>({
    bodyShape: undefined,
    woodMaterial: undefined,
    craftType: undefined,
    hardwareConfig: { ...DEFAULT_HARDWARE },
    referenceImages: [],
    notes: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerCountry: '',
  })

  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const submittedReferenceNo = ref<string | null>(null)

  function setStep(step: number) {
    currentStep.value = Math.max(1, Math.min(step, totalSteps))
  }

  function nextStep() {
    if (currentStep.value < totalSteps) currentStep.value++
  }

  function prevStep() {
    if (currentStep.value > 1) currentStep.value--
  }

  function setBodyShape(shape: BodyShape) {
    order.value.bodyShape = shape
  }

  function setWoodMaterial(wood: WoodMaterial) {
    order.value.woodMaterial = wood
  }

  function setCraftType(craft: CraftOption) {
    order.value.craftType = craft
  }

  function setHardwareConfig(config: Partial<HardwareConfig>) {
    order.value.hardwareConfig = { ...order.value.hardwareConfig, ...config } as HardwareConfig
  }

  function addReferenceImage(url: string) {
    if (!order.value.referenceImages) order.value.referenceImages = []
    order.value.referenceImages.push(url)
  }

  function removeReferenceImage(index: number) {
    order.value.referenceImages?.splice(index, 1)
  }

  function setCustomerInfo(info: Pick<CustomOrder, 'customerName' | 'customerEmail' | 'customerPhone' | 'customerCountry' | 'notes'>) {
    Object.assign(order.value, info)
  }

  const stepCompletionMap = computed(() => ({
    1: !!order.value.bodyShape,
    2: !!order.value.woodMaterial,
    3: !!order.value.craftType,
    4: !!(order.value.hardwareConfig?.bridge && order.value.hardwareConfig?.pickups),
    5: true,
    6: !!(order.value.customerName && order.value.customerEmail),
  }))

  const canProceedFromStep = computed(() => stepCompletionMap.value[currentStep.value as keyof typeof stepCompletionMap.value])

  function reset() {
    currentStep.value = 1
    isSubmitted.value = false
    submittedReferenceNo.value = null
    order.value = {
      bodyShape: undefined,
      woodMaterial: undefined,
      craftType: undefined,
      hardwareConfig: { ...DEFAULT_HARDWARE },
      referenceImages: [],
      notes: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerCountry: '',
    }
  }

  return {
    currentStep,
    totalSteps,
    order,
    isSubmitting,
    isSubmitted,
    submittedReferenceNo,
    stepCompletionMap,
    canProceedFromStep,
    setStep,
    nextStep,
    prevStep,
    setBodyShape,
    setWoodMaterial,
    setCraftType,
    setHardwareConfig,
    addReferenceImage,
    removeReferenceImage,
    setCustomerInfo,
    reset,
  }
})
