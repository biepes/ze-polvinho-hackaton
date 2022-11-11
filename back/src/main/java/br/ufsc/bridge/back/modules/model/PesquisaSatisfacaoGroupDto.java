package br.ufsc.bridge.back.modules.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;

@Data
@Getter
@Setter
public class PesquisaSatisfacaoGroupDto {

	@Id
	private PesquisaAvaliacaoDto key;

	private int quantidade;

}
