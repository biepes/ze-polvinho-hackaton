package br.ufsc.bridge.back.modules.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Data
@Setter
@AllArgsConstructor
public class PesquisaResultDto {

	private String versao;
	private List<GrauAvaliacaoDto> data;

}
