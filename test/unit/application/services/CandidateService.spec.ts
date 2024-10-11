import { describe, it, expect, vi } from 'vitest'
import CandidateService from '../../../../src/application/services/CandidateService'
import CandidateRepository from '../../../../src/infrastructure/http/CandidateRepository'
import type { CandidateDTO } from '../../../../src/application/dtos/CandidateDTO'

vi.mock('@/infrastructure/http/CandidateRepository')

describe('CandidateService', () => {
  const mockCandidate: CandidateDTO = {
    firstName: 'test-name',
    lastName: 'test-lastname',
    vacancyId: 'test-vacancy-id',
    statusId: 'status-id',
    candidateId: 'candidate-id'
  }

  it('should fetch candidates by vacancyId', async () => {
    const mockResponse = { data: [mockCandidate] }
    ;(CandidateRepository.getVacancyCandidates as vi.Mock).mockResolvedValue(mockResponse)

    const candidates = await CandidateService.fetchCandidates('vacancy-1')

    expect(candidates).toEqual(mockResponse.data)
    expect(CandidateRepository.getVacancyCandidates).toHaveBeenCalledWith('vacancy-1')
  })

  it('should create a new candidate', async () => {
    const mockResponse = { data: mockCandidate }
    ;(CandidateRepository.addCandidate as vi.Mock).mockResolvedValue(mockResponse)

    const createdCandidate = await CandidateService.createCandidate(mockCandidate)

    expect(createdCandidate).toEqual(mockCandidate)
    expect(CandidateRepository.addCandidate).toHaveBeenCalledWith(mockCandidate)
  })

  it('should update a candidate', async () => {
    const mockResponse = { data: mockCandidate }
    ;(CandidateRepository.updateCandidate as vi.Mock).mockResolvedValue(mockResponse)

    const updatedCandidate = await CandidateService.updateCandidate('1', mockCandidate)

    expect(updatedCandidate).toEqual(mockCandidate)
    expect(CandidateRepository.updateCandidate).toHaveBeenCalledWith('1', mockCandidate)
  })

  it('should fetch candidate status by vacancyId', async () => {
    const mockResponse = { data: ['status-1'] }
    ;(CandidateRepository.getCandidateStatus as vi.Mock).mockResolvedValue(mockResponse)

    const status = await CandidateService.fetchCandidateStatus('vacancy-1')

    expect(status).toEqual(mockResponse.data)
    expect(CandidateRepository.getCandidateStatus).toHaveBeenCalledWith('vacancy-1')
  })
})
