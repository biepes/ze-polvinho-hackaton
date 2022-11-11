package br.ufsc.bridge.back.modules.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufsc.bridge.back.modules.model.GrauAvaliacaoDto;
import br.ufsc.bridge.back.modules.model.PesquisaSatisfacao;
import br.ufsc.bridge.back.modules.repository.PesquisaSatisfacaoRepository;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pesquisa-satisfacao")
public class PesquisaSatisfacaoController {

	private final PesquisaSatisfacaoRepository pesquisaSatisfacaoRepository;

	@GetMapping("avaliacoes")
	public Map<String, List<GrauAvaliacaoDto>> getMapAvaliacoes() {
		return this.pesquisaSatisfacaoRepository.groupByLastnameAnd()
				.stream()
				.collect(Collectors
						.groupingBy(pesquisaSatisfacaoGroupDto-> pesquisaSatisfacaoGroupDto.getKey().getVersao(),
								Collectors.mapping(pesquisaSatisfacaoGroupDto ->
										new GrauAvaliacaoDto(pesquisaSatisfacaoGroupDto.getKey().getGrauSatisfacao(), pesquisaSatisfacaoGroupDto.getQuantidade()), Collectors.toList())));
	}

	@GetMapping
	public Page<PesquisaSatisfacao> getAvaliacoes(Pageable pageable) {
		return this.pesquisaSatisfacaoRepository.findAll(pageable);
	}


}

