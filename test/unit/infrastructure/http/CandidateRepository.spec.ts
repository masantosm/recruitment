import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import axiosInstance from '../../../../src/plugins/axios'
import CandidateRepository from '../../../../src/infrastructure/http/CandidateRepository'
import axiosMockAdapter from 'axios-mock-adapter'
import type { CandidateDTO } from '../../../../src/application/dtos/CandidateDTO'

describe('CandidateRepository', () => {
  let mock: axiosMockAdapter

  beforeAll(() => {
    mock = new axiosMockAdapter(axiosInstance)
  })

  afterEach(() => {
    mock.reset()
  })

  it('should fetch candidate status by vacancyId', async () => {
    const vacancyId = 'vacancy-1'
    const mockStatus = ['status-1', 'status-2']

    mock.onGet(`/candidate-status/${vacancyId}`).reply(200, mockStatus)

    const response = await CandidateRepository.getCandidateStatus(vacancyId)

    expect(response.data).toEqual(mockStatus)
    expect(mock.history.get[0].url).toBe(`/candidate-status/${vacancyId}`)
  })

  it('should fetch vacancy candidates', async () => {
    const vacancyId = 'vacancy-1'
    const mockCandidates: CandidateDTO[] = [
      {
        firstName: 'test-name',
        lastName: 'test-lastname',
        vacancyId: 'test-vacancy-id',
        statusId: 'status-id',
        candidateId: 'candidate-id'
      }
    ]

    mock.onGet(`/vacancies/${vacancyId}/candidates`).reply(200, mockCandidates)

    const response = await CandidateRepository.getVacancyCandidates(vacancyId)

    expect(response.data).toEqual(mockCandidates)
    expect(mock.history.get[0].url).toBe(`/vacancies/${vacancyId}/candidates`)
  })

  it('should add a new candidate', async () => {
    const candidateData: CandidateDTO = {
      firstName: 'test-name',
      lastName: 'test-lastname',
      vacancyId: 'test-vacancy-id',
      statusId: 'status-id',
      candidateId: 'candidate-id'
    }

    mock.onPost('/candidates').reply(201, candidateData)

    const response = await CandidateRepository.addCandidate(candidateData)

    expect(response.data).toEqual(candidateData)
    expect(mock.history.post[0].url).toBe('/candidates')
  })

  it('should update a candidate', async () => {
    const candidateId = '1'
    const candidateData: CandidateDTO = {
      firstName: 'test-name',
      lastName: 'test-lastname',
      vacancyId: 'test-vacancy-id',
      statusId: 'status-id',
      candidateId: 'candidate-id'
    }

    mock.onPut(`/candidates/${candidateId}`).reply(200, candidateData)

    const response = await CandidateRepository.updateCandidate(candidateId, candidateData)

    expect(response.data).toEqual(candidateData)
    expect(mock.history.put[0].url).toBe(`/candidates/${candidateId}`)
  })
})
