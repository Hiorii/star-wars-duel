import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });

    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get data for a person', () => {
    const mockData = { name: 'Luke Skywalker' };
    const id = 1;

    service.getPeople(id).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}/people/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get data for a starship', () => {
    const mockData = { name: 'Millennium Falcon' };
    const id = 10;

    service.getStarship(id).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${service.baseUrl}/starships/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
