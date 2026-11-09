package build_right_backend.controller;

import build_right_backend.dto.CreateTestCaseRequest;
import build_right_backend.entity.TestCase;
import build_right_backend.service.TestCaseService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-cases")
public class TestCaseController {

    private final TestCaseService testCaseService;

    public TestCaseController(TestCaseService testCaseService) {
        this.testCaseService = testCaseService;
    }

    @PostMapping("/requirement/{requirementId}")
    @ResponseStatus(HttpStatus.CREATED)
    public TestCase createTestCase(
            @PathVariable Long requirementId,
            @Valid @RequestBody CreateTestCaseRequest request) {

        return testCaseService.createTestCase(
                requirementId,
                request.getTitle(),
                request.getSteps(),
                request.getExpectedResult()
        );
    }

    @GetMapping("/requirement/{requirementId}")
    public List<TestCase> getTestCases(
            @PathVariable Long requirementId) {

        return testCaseService.getTestCasesByRequirement(requirementId);
    }

    @PatchMapping("/{testCaseId}/status")
    public TestCase updateTestCaseStatus(
            @PathVariable Long testCaseId,
            @RequestParam String status) {

        return testCaseService.updateTestCaseStatus(testCaseId, status);
    }
}

