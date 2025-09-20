package org.npeonelove.backend.mapper.resumeMapper;


import org.mapstruct.Mapper;
import org.npeonelove.backend.dto.resume.RoleDTO;
import org.npeonelove.backend.model.resumeEntity.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toEntity(RoleDTO dto);
    RoleDTO toDto(Role entity);
}
