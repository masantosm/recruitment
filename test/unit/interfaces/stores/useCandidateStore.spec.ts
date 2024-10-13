import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'
import CandidateService from '@/application/services/CandidateService'
import type { CandidateDTO } from '@/application/dtos/CandidateDTO'
import type { Status } from '@/domain/models/Status'

vi.mock('@/application/services/CandidateService')

describe('Candidate Store', () => {
  let candidateStore: ReturnType<typeof useCandidateStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    candidateStore = useCandidateStore()
  })

  it('should initialize with an empty candidates array and status array', () => {
    expect(candidateStore.candidates).toEqual([])
    expect(candidateStore.vacancyStatus).toEqual([])
  })

  it('should load candidates for a vacancy', async () => {
    const mockCandidates: CandidateDTO[] = [
      {
        firstName: 'test-name',
        lastName: 'test-lastname',
        vacancyId: 'test-vacancy-id',
        statusId: 'status-id',
        candidateId: 'candidate-id',
        updatedAt: 'date'
      }
    ]

    ;(CandidateService.fetchCandidates as vi.Mock).mockResolvedValue({ data: mockCandidates })
    await candidateStore.loadCandidatesVacancy('vacancyId')

    expect(candidateStore.candidates).toEqual(mockCandidates)
    expect(CandidateService.fetchCandidates).toHaveBeenCalledWith('vacancyId')
  })

  it('should load candidate status', async () => {
    const mockStatus: Status[] = [
      {
        id: '1',
        name: 'Interview',
        order: '1',
        companyId: '1',
        createdAt: '1',
        updatedAt: '1',
        vacancyId: 'vacancyId'
      }
    ]

    ;(CandidateService.fetchCandidateStatus as vi.Mock).mockResolvedValue({ data: mockStatus })

    await candidateStore.loadCandidateStatus('vacancyId')

    expect(candidateStore.vacancyStatus).toEqual(mockStatus)
    expect(CandidateService.fetchCandidateStatus).toHaveBeenCalledWith('vacancyId')
  })

  it('should load candidates for a vacancy', async () => {
    const mockCandidates: CandidateDTO[] = [
      {
        firstName: 'test-name',
        lastName: 'test-lastname',
        vacancyId: 'test-vacancy-id',
        statusId: 'status-id',
        candidateId: 'candidate-id',
        updatedAt: 'date'
      }
    ]

    ;(CandidateService.fetchCandidates as vi.Mock).mockResolvedValue({ data: mockCandidates })

    await candidateStore.loadCandidatesVacancy('vacancyId')

    expect(candidateStore.candidates).toEqual(mockCandidates)
    expect(CandidateService.fetchCandidates).toHaveBeenCalledWith('vacancyId')
  })

  it('should update candidate status', async () => {
    const candidateData: CandidateDTO = {
      firstName: 'test-name',
      lastName: 'test-lastname',
      vacancyId: 'test-vacancy-id',
      statusId: 'status-id',
      candidateId: 'candidate-id',
      updatedAt: 'date'
    }

    const candidateId = '1'
    const mockCandidate: CandidateDTO = candidateData
    const vacancyId = 'vacancyId'

    await candidateStore.updateCandidateStatus(candidateId, mockCandidate, vacancyId)

    expect(CandidateService.updateCandidate).toHaveBeenCalledWith(candidateId, mockCandidate)
    expect(CandidateService.fetchCandidates).toHaveBeenCalledWith(vacancyId)
  })

  it('should update filterValue', async () => {
    const filterValueMock = 'test'

    await candidateStore.setFilterValue(filterValueMock)

    expect(candidateStore.filterValue).toStrictEqual(filterValueMock)
  })

  it('should create a new candidate', async () => {
    const mockCandidate: CandidateDTO = {
      firstName: 'test-name',
      lastName: 'test-lastname',
      vacancyId: 'test-vacancy-id',
      statusId: 'status-id',
      candidateId: 'candidate-id',
      updatedAt: 'date'
    }
    const vacancyId = 'test-vacancy-id'

    await candidateStore.createNewCandidate(mockCandidate, vacancyId)

    expect(CandidateService.createCandidate).toHaveBeenCalledWith(mockCandidate)
    expect(CandidateService.fetchCandidates).toHaveBeenCalledWith(vacancyId)
  })

  it('should return the vacancy ID', () => {
    expect(candidateStore.getVacancyID).toBe('106ec090-e5a5-45af-b82f-a3b5eda4117c')
  })

  it('should return candidates from getter', () => {
    const mockCandidates: CandidateDTO[] = [
      {
        firstName: 'test-name',
        lastName: 'test-lastname',
        vacancyId: 'test-vacancy-id',
        statusId: 'status-id',
        candidateId: 'candidate-id',
        updatedAt: 'date'
      }
    ]
    candidateStore.candidates = mockCandidates
    expect(candidateStore.getCandidates).toEqual(mockCandidates)
  })

  it('should return candidate status from getter', () => {
    const mockStatus: Status[] = [
      {
        id: '1',
        name: 'Interview',
        order: '1',
        companyId: '1',
        createdAt: '1',
        updatedAt: '1',
        vacancyId: '1'
      }
    ]

    candidateStore.vacancyStatus = mockStatus
    expect(candidateStore.getCandidateStatus).toEqual(mockStatus)
  })

  it('should return candidates from getter wihtout filter', () => {
    const mockCandidates: CandidateDTO[] = [
      {
        firstName: 'test-name',
        lastName: 'test-lastname',
        vacancyId: 'test-vacancy-id',
        statusId: 'status-id',
        candidateId: 'candidate-id',
        updatedAt: 'date'
      },
      {
        firstName: 'test-name-2',
        lastName: 'test-lastname-2',
        vacancyId: 'test-vacancy-id',
        statusId: 'status-id',
        candidateId: 'candidate-id-2',
        updatedAt: 'date'
      }
    ]
    candidateStore.candidates = mockCandidates
    candidateStore.setFilterValue('')
    expect(candidateStore.getFilteredCandidates).toHaveLength(2)
    expect(candidateStore.getFilteredCandidates).toEqual(mockCandidates)

    candidateStore.setFilterValue('lastname-2')
    expect(candidateStore.getFilteredCandidates).toHaveLength(1)
    expect(candidateStore.getFilteredCandidates).toEqual([mockCandidates[1]])

    candidateStore.setFilterValue('miguel')
    expect(candidateStore.getFilteredCandidates).toHaveLength(0)
    expect(candidateStore.getFilteredCandidates).toEqual([])
  })
})
