package build_right_backend.controller;

import build_right_backend.dto.CreateRequirementRequest;
import build_right_backend.entity.Requirement;
import build_right_backend.service.RequirementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requirements")
public class RequirementController {

    private final RequirementService requirementService;

    public RequirementController(RequirementService requirementService) {
        this.requirementService = requirementService;
    }

    @PostMapping("/project/{projectId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Requirement createRequirement(
            @PathVariable Long projectId,
            @Valid @RequestBody CreateRequirementRequest request) {

        return requirementService.createRequirement(
                projectId,
                request.getTitle(),
                request.getDescription()
        );
    }

    @GetMapping("/project/{projectId}")
    public List<Requirement> getRequirements(
            @PathVariable Long projectId) {

        return requirementService.getRequirementsByProject(projectId);
    }
}
