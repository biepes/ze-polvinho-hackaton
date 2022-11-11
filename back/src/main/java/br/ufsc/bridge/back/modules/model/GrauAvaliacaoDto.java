package br.ufsc.bridge.back.modules.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;

@AllArgsConstructor
@Data
@Getter
@Setter
public class GrauAvaliacaoDto {

	private String grauSatisfacao;
	private int quantidade;

}
