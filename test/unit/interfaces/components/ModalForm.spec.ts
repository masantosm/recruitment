import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ModalFormComponent from '@/interfaces/components/ModalForm.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'
import { Status } from '@/domain/models/Status'
import { CandidateDTO } from '@/application/dtos/CandidateDTO'

describe('ModalFormComponent component is definied', () => {
  const mockUpdateCandidate = vi.fn()
  const mockCreateCandidate = vi.fn()
  const mockVacancyId = 'vacancy-123'
  const mockGetCandidateStatus: Status[] = [
    {
      id: 'id-1',
      name: 'Interview',
      order: 'status-1',
      companyId: 'companyId-1',
      createdAt: 'createdAt-1',
      updatedAt: 'updatedAt-1',
      vacancyId: 'vacancyId-1'
    },
    {
      id: 'id-2',
      name: 'Interview',
      order: 'status-2',
      companyId: 'companyId-2',
      createdAt: 'createdAt-2',
      updatedAt: 'updatedAt-2',
      vacancyId: 'vacancyId-2'
    }
  ]
  const mockCandidate: CandidateDTO = {
    firstName: 'test-name',
    lastName: 'test-last-name',
    vacancyId: 'vacancy-123',
    statusId: 'status-id',
    candidateId: '-',
    updatedAt: '-'
  }
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const candidateStore = useCandidateStore()
    candidateStore.createNewCandidate = mockCreateCandidate
    candidateStore.updateCandidateStatus = mockUpdateCandidate
    candidateStore.vacancyStatus = mockGetCandidateStatus
    candidateStore.vacancyId = mockVacancyId
  })

  it('should render modal with title "Alta de Candidato"', () => {
    const wrapper = shallowMount(ModalFormComponent, {
      props: {
        open: true,
        candidate: null
      }
    })

    const modalForm = wrapper.find('[data-test-id="modal-form"]')
    expect(modalForm.exists()).toBeTruthy()
    const modalFormTitle = wrapper.find('[data-test-id="modal-form-title"]')
    expect(modalFormTitle.exists()).toBeTruthy()
    expect(modalFormTitle.text()).toMatch('Alta de Candidato')

    const modalFormAccept = wrapper.find('[data-test-id="modal-form-accept-button"]')
    expect(modalFormAccept.exists()).toBeTruthy()
    expect(modalFormAccept.text()).toStrictEqual('Alta')
    expect(modalFormAccept.attributes('disabled')).toBeDefined()

    const modalFormCancel = wrapper.find('[data-test-id="modal-form-cancel-button"]')
    expect(modalFormCancel.exists()).toBeTruthy()
    expect(modalFormCancel.text()).toStrictEqual('Cancelar')
  })

  it('should render modal with title "Editar Candidato"', () => {
    const wrapper = shallowMount(ModalFormComponent, {
      props: {
        open: true,
        candidate: mockCandidate
      }
    })

    const modalForm = wrapper.find('[data-test-id="modal-form"]')
    expect(modalForm.exists()).toBeTruthy()
    const modalFormTitle = wrapper.find('[data-test-id="modal-form-title"]')
    expect(modalFormTitle.exists()).toBeTruthy()
    expect(modalFormTitle.text()).toMatch('Editar candidato')

    const modalFormAccept = wrapper.find('[data-test-id="modal-form-accept-button"]')
    expect(modalFormAccept.exists()).toBeTruthy()
    expect(modalFormAccept.text()).toStrictEqual('Editar')
    expect(modalFormAccept.attributes('disabled')).toBeFalsy()

    const modalFormCancel = wrapper.find('[data-test-id="modal-form-cancel-button"]')
    expect(modalFormCancel.exists()).toBeTruthy()
    expect(modalFormCancel.text()).toStrictEqual('Cancelar')
  })

  it('should no render modal when open props is false', () => {
    const wrapper = shallowMount(ModalFormComponent, {
      props: {
        open: false
      }
    })

    const modalForm = wrapper.find('[data-test-id="modal-form"]')
    expect(modalForm.exists()).toBeFalsy()
  })

  it('when user click on "Alta" should create a new candidate', async () => {
    const wrapper = shallowMount(ModalFormComponent, {
      props: {
        open: true
      }
    })
    const selectComponent = wrapper.findComponent({ name: 'CustomSelect' })
    expect(selectComponent.exists()).toBeTruthy()
    await selectComponent.vm.$emit('update:modelValue', mockCandidate.statusId)

    const inputNameComponent = wrapper.findAllComponents({ name: 'CustomInput' })
    expect(inputNameComponent[0].exists()).toBeTruthy()
    await inputNameComponent[0].vm.$emit('update:modelValue', mockCandidate.firstName)

    const inputLastNameComponent = wrapper.findAllComponents({ name: 'CustomInput' })
    expect(inputLastNameComponent[1].exists()).toBeTruthy()
    await inputLastNameComponent[1].vm.$emit('update:modelValue', mockCandidate.lastName)

    const modalFormAccept = wrapper.find('[data-test-id="modal-form-accept-button"]')
    expect(modalFormAccept.exists()).toBeTruthy()

    await modalFormAccept.trigger('click')
    expect(mockCreateCandidate).toHaveBeenCalledWith(mockCandidate, 'vacancy-123')
    expect(wrapper.emitted()).toHaveProperty('closeModal')
  })

  it('when user click on "Edit" should update a candidate', async () => {
    const mockCandidate: CandidateDTO = {
      firstName: 'test-name',
      lastName: 'test-lastname',
      vacancyId: 'test-vacancy-id',
      statusId: 'status-id',
      candidateId: 'candidate-id',
      updatedAt: 'date'
    }
    const wrapper = shallowMount(ModalFormComponent, {
      props: {
        open: true,
        candidate: mockCandidate
      }
    })
    const modalFormAccept = wrapper.find('[data-test-id="modal-form-accept-button"]')
    expect(modalFormAccept.exists()).toBeTruthy()
    expect(modalFormAccept.text()).toStrictEqual('Editar')
    await modalFormAccept.trigger('click')

    expect(mockUpdateCandidate).toHaveBeenCalledWith(
      mockCandidate.candidateId,
      mockCandidate,
      'vacancy-123'
    )
    expect(wrapper.emitted()).toHaveProperty('closeModal')
  })

  it('when user click on "Cancel" should emit "close-modal', async () => {
    const wrapper = shallowMount(ModalFormComponent, {
      props: {
        open: true
      }
    })
    const modalFormCancel = wrapper.find('[data-test-id="modal-form-cancel-button"]')
    expect(modalFormCancel.exists()).toBeTruthy()

    await modalFormCancel.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('closeModal')
  })

  it('when user click on "X" should emit "close-modal', async () => {
    const wrapper = shallowMount(ModalFormComponent, {
      props: {
        open: true
      }
    })
    const modalFormCancel = wrapper.find('[data-test-id="x-button"]')
    expect(modalFormCancel.exists()).toBeTruthy()

    await modalFormCancel.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('closeModal')
  })
})
