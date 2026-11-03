package build_right_backend.service;

import build_right_backend.entity.Project;
import build_right_backend.entity.Requirement;
import build_right_backend.repository.ProjectRepository;
import build_right_backend.repository.RequirementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequirementService {

    private final RequirementRepository requirementRepository;
    private final ProjectRepository projectRepository;

    public RequirementService(
            RequirementRepository requirementRepository,
            ProjectRepository projectRepository) {
        this.requirementRepository = requirementRepository;
        this.projectRepository = projectRepository;
    }

    public Requirement createRequirement(Long projectId, String title, String description) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Requirement requirement = new Requirement();
        requirement.setTitle(title);
        requirement.setDescription(description);
        requirement.setProject(project);

        return requirementRepository.save(requirement);
    }

    public List<Requirement> getRequirementsByProject(Long projectId) {

        if (!projectRepository.existsById(projectId)) {
            throw new RuntimeException("Project not found");
        }

        return requirementRepository.findByProjectId(projectId);
    }
}

