package build_right_backend.service;

import build_right_backend.entity.Requirement;
import build_right_backend.entity.TestCase;
import build_right_backend.repository.RequirementRepository;
import build_right_backend.repository.TestCaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestCaseService {

    private final TestCaseRepository testCaseRepository;
    private final RequirementRepository requirementRepository;

    public TestCaseService(
            TestCaseRepository testCaseRepository,
            RequirementRepository requirementRepository) {
        this.testCaseRepository = testCaseRepository;
        this.requirementRepository = requirementRepository;
    }

    public TestCase createTestCase(
            Long requirementId,
            String title,
            String steps,
            String expectedResult) {

        Requirement requirement = requirementRepository.findById(requirementId)
                .orElseThrow(() -> new RuntimeException("Requirement not found"));

        TestCase testCase = new TestCase();
        testCase.setTitle(title);
        testCase.setSteps(steps);
        testCase.setExpectedResult(expectedResult);
        testCase.setRequirement(requirement);

        return testCaseRepository.save(testCase);
    }

    public List<TestCase> getTestCasesByRequirement(Long requirementId) {
        if (!requirementRepository.existsById(requirementId)) {
            throw new RuntimeException("Requirement not found");
        }

        return testCaseRepository.findByRequirementId(requirementId);
    }

    public TestCase updateTestCaseStatus(Long testCaseId, String status) {
        if (!List.of("NOT_RUN", "PASS", "FAIL").contains(status)) {
            throw new IllegalArgumentException("Invalid test case status");
        }

        TestCase testCase = testCaseRepository.findById(testCaseId)
                .orElseThrow(() -> new RuntimeException("Test case not found"));

        testCase.setStatus(status);

        return testCaseRepository.save(testCase);
    }
}

