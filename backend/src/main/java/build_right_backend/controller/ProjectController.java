package build_right_backend.controller;

import build_right_backend.entity.Project;
import build_right_backend.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Project createProject(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String description = request.get("description");

        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Project name is required");
        }

        if (description == null || description.isBlank()) {
            throw new IllegalArgumentException("Project description is required");
        }

        return projectService.createProject(name.trim(), description.trim());
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
}
