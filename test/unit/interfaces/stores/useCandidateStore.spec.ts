// src/__tests__/candidateStore.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCandidateStore } from '../../../../src/interfaces/stores/useCandidateStore'
import CandidateService from '../../../../src/application/services/CandidateService'
import type { CandidateDTO } from '../../../../src/application/dtos/CandidateDTO'
import type { Status } from '../../../../src/domain/models/Status'

// Mock the CandidateService
vi.mock('../../../../src/application/services/CandidateService')

describe('Candidate Store', () => {
  let candidateStore: ReturnType<typeof useCandidateStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    candidateStore = useCandidateStore() // Create a new instance of the store
  })

  it('should initialize with an empty candidates array and status array', () => {
    expect(candidateStore.candidates).toEqual([])
    expect(candidateStore.candidateStatus).toEqual([])
  })

  it('should load candidates for a vacancy', async () => {
    const mockCandidates: CandidateDTO[] = [
      {
        firstName: 'test-name',
        lastName: 'test-lastname',
        vacancyId: 'test-vacancy-id',
        statusId: 'status-id',
        candidateId: 'candidate-id'
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

    expect(candidateStore.candidateStatus).toEqual(mockStatus)
    expect(CandidateService.fetchCandidateStatus).toHaveBeenCalledWith('vacancyId')
  })

  it('should load candidates for a vacancy', async () => {
    const mockCandidates: CandidateDTO[] = [
      {
        firstName: 'test-name',
        lastName: 'test-lastname',
        vacancyId: 'test-vacancy-id',
        statusId: 'status-id',
        candidateId: 'candidate-id'
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
      candidateId: 'candidate-id'
    }

    const candidateId = '1'
    const mockCandidate: CandidateDTO = candidateData
    const vacancyId = 'vacancyId'

    await candidateStore.updateCandidateStatus(candidateId, mockCandidate, vacancyId)

    expect(CandidateService.updateCandidate).toHaveBeenCalledWith(candidateId, mockCandidate)
    expect(CandidateService.fetchCandidates).toHaveBeenCalledWith(vacancyId)
  })

  it('should create a new candidate', async () => {
    const mockCandidate: CandidateDTO = {
      firstName: 'test-name',
      lastName: 'test-lastname',
      vacancyId: 'test-vacancy-id',
      statusId: 'status-id',
      candidateId: 'candidate-id'
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
        candidateId: 'candidate-id'
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

    candidateStore.candidateStatus = mockStatus
    expect(candidateStore.getCandidateStatus).toEqual(mockStatus)
  })
})
